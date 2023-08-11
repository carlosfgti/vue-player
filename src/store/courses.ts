import Course from '@/entities/Course'
import CoursesGatewayHttp from '@/infra/gateway/CoursesGatewayHttp'
import { defineStore } from 'pinia'

const coursesGateway = new CoursesGatewayHttp('/courses')

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[],
    courseSelected: null as null | Course
  }),
  getters: {
    totalCourseComplete(state): number {
      if (this.courseSelected === null) return 0

      let totalLessonsCourse = 0
      state.courseSelected?.modules?.map(
        (module) => (totalLessonsCourse += module.lessons?.length ?? 0)
      )

      let totalLessonsWithViews = 0
      state.courseSelected?.modules?.map((module) => {
        module.lessons?.map((lesson) => {
          if (lesson.views > 0) {
            totalLessonsWithViews++
          }
        })
      })

      return (totalLessonsWithViews / totalLessonsCourse) * 100
    }
  },
  actions: {
    async getAllCourses() {
      this.courses = await coursesGateway.getAll()
    },
    async getCourse(id: string) {
      this.courseSelected = await coursesGateway.get(id)
    },
    markLessonViewed(lessonUrl: string): void {
      this.courseSelected?.modules?.map((module, indexModule) => {
        module.lessons?.map((lesson, indexLesson) => {
          if (lesson.url === lessonUrl) {
            // @ts-ignore
            this.courseSelected.modules[indexModule].lessons[indexLesson].views = 1
          }
        })
      })
    }
  }
})
