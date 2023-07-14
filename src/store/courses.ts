import Course from '@/entities/Course'
import CoursesGatewayHttp from '@/infra/gateway/CoursesGatewayHttp'
import { defineStore } from 'pinia'

const CoursesGateway = new CoursesGatewayHttp('/courses');

export const useCounterStore = defineStore('courses', {
    state: () => ({
        courses: [] as Course[],
    }),
    getters: {
      
    },
    actions: {
      async getAllCourses() {
        this.courses = await CoursesGateway.getAll();
      }
    },
})