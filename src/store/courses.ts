import Course from '@/entities/Course'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        courses: Array<Course>,
    }),
    getters: {
      
    },
    actions: {
      
    },
})