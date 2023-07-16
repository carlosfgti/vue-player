import Course from '@/entities/Course'
import CoursesGatewayHttp from '@/infra/gateway/CoursesGatewayHttp'
import { defineStore } from 'pinia'

const coursesGateway = new CoursesGatewayHttp('/courses')

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[]
  }),
  getters: {},
  actions: {
    async getAllCourses() {
      this.courses = await coursesGateway.getAll()
    }
  }
})
