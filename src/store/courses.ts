import Course from '@/entities/Course'
import CoursesGatewayHttp from '@/infra/gateway/CoursesGatewayHttp'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('courses', {
    state: () => ({
        courses: Array<Course>,
    }),
    getters: {
      
    },
    actions: {
      async getAllCourses(): Promise<Course[]> {
        const courses = new CoursesGatewayHttp('/courses');
        return await courses.get();
      }
    },
})