import Course from '@/entities/Course'
import CoursesGatewayHttp from '@/infra/gateway/CoursesGatewayHttp'
import { defineStore } from 'pinia'

const coursesGateway = new CoursesGatewayHttp('/courses')

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[],
    courseSelected: null as null | Course
  }),
  getters: {},
  actions: {
    async getAllCourses() {
      this.courses = await coursesGateway.getAll()
    },
    async getCourse(id: string) {
      this.courseSelected = await coursesGateway.get(id)
    }
  }
})
