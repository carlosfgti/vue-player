import Course from '@/entities/Course'
import CoursesGatewayHttp from '@/infra/gateway/CoursesGatewayHttp'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('courses', {
    state: () => ({
        courses: [] as Course[],
    }),
    getters: {
      
    },
    actions: {
      async getAllCourses() {
        const CoursesGateway = new CoursesGatewayHttp('/courses');
        this.courses = await CoursesGateway.getAll();
      }
    },
})