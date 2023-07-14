import Course from '@/entities/Course'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('courses', {
    state: () => ({
        courses: Array<Course>,
    }),
    getters: {
      
    },
    actions: {
      
    },
})