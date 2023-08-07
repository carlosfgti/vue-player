import Lesson from '@/entities/Lesson'
import LessonsGatewayHttp from '@/infra/gateway/LessonsGatewayHttp'
import { defineStore } from 'pinia'

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
    }
  }
})
