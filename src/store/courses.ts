import Course from '@/entities/Course'
import CoursesGatewayHttp from '@/infra/gateway/CoursesGatewayHttp'
import type { MyCourseType } from '@/types'
import { defineStore } from 'pinia'

const coursesGateway = new CoursesGatewayHttp('/courses')

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[],
    myCourses: null as MyCourseType | null,
    courseSelected: null as Course | null
  }),
  getters: {
    totalCourseComplete(state): number {
      if (!state.courseSelected) return 0

      return this.calcTotalCourseCompleted(state.courseSelected)
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
      if (!this.courseSelected) return

      this.courseSelected.modules?.forEach((module, indexModule) => {
        module.lessons?.forEach((lesson, indexLesson) => {
          if (lesson.url === lessonUrl) {
            // @ts-ignore
            this.courseSelected.modules[indexModule].lessons[indexLesson].views = 1
          }
        })
      })
    },
    async fetchMyCourses() {
      this.myCourses = await coursesGateway.getMyCourses()
    },
    calcTotalCourseCompleted(course: Course): number {
      let totalLessonsCourse = 0
      let totalLessonsWithViews = 0

      course.modules?.forEach((module) => {
        totalLessonsCourse += module.lessons?.length || 0

        module.lessons?.forEach((lesson) => {
          if (lesson.views > 0) {
            totalLessonsWithViews++
          }
        })
      })

      return (totalLessonsWithViews / totalLessonsCourse) * 100 || 0
    }
  }
})
