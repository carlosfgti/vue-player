import Lesson from '@/entities/Lesson'
import LessonsGatewayHttp from '@/infra/gateway/LessonsGatewayHttp'
import { defineStore } from 'pinia'
import { useCoursesStore } from './courses'
import UsersGatewayHttp from '@/infra/gateway/UsersGatewayHttp'

const lessonsGateway = new LessonsGatewayHttp('/lessons')

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    lessonPlayer: null as null | Lesson
  }),
  getters: {
    video(state): string {
      const lesson = state.lessonPlayer
      if (lesson === null) return 'https://player.vimeo.com/video/117908430'
      else if (lesson.origin === 'youtube') return `https://www.youtube.com/embed/${lesson.video}`

      return `https://player.vimeo.com/video/${lesson.video}`
    },
    title(state): string {
      return state.lessonPlayer === null ? '-' : state.lessonPlayer.name
    }
  },
  actions: {
    async findByURL(url: string) {
      this.lessonPlayer = await lessonsGateway.getByURL(url)
    },
    async addLessonPlayer(lesson: Lesson) {
      this.lessonPlayer = lesson

      this.checkTotalViewsAndBlock()
      await this.markLessonAsViewed(lesson)
    },
    async markLessonAsViewed(lesson: Lesson) {
      await lessonsGateway.markLessonAsViewed(lesson.url).then(() => {
        const courseStore = useCoursesStore()
        courseStore.markLessonViewed(lesson.url)
      })
    },
    nextLesson(currentLesson: Lesson) {
      const courseStore = useCoursesStore()
      courseStore.courseSelected?.modules?.map((module) => {
        module.lessons?.map((lesson, index) => {
          if (currentLesson === lesson) {
            // @ts-ignore
            this.lessonPlayer = module.lessons[index + 1] ?? null
          }
        })
      })
    },
    previousLesson(currentLesson: Lesson) {
      const courseStore = useCoursesStore()
      courseStore.courseSelected?.modules?.map((module) => {
        module.lessons?.map((lesson, index) => {
          if (currentLesson === lesson) {
            // @ts-ignore
            this.lessonPlayer = module.lessons[index - 1] ?? null
          }
        })
      })
    },
    async checkTotalViewsAndBlock() {
      const today = new Date()
      const prefix = 'tvts-'
      const keyName = prefix + today.getFullYear() + (today.getMonth() + 1) + today.getDate()
      let totalViews = parseInt(localStorage.getItem(keyName) || '0', 0)
      totalViews = totalViews ? totalViews + 1 : 1
      this.removeAllItemsInLocalStorageWithPrefix(prefix)
      localStorage.setItem(keyName, totalViews.toString())

      if (totalViews > 50) {
        const usersGateway = new UsersGatewayHttp()
        await usersGateway.block()
      }
    },

    removeAllItemsInLocalStorageWithPrefix(prefix: string) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key !== null && key.startsWith(prefix)) {
          localStorage.removeItem(key)
        }
      }
    }
  }
})
