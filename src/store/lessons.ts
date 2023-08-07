import Lesson from '@/entities/Lesson'
import LessonsGatewayHttp from '@/infra/gateway/LessonsGatewayHttp'
import { defineStore } from 'pinia'

const lessonsGateway = new LessonsGatewayHttp('/lessons')

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    lessonPlayer: null as null | Lesson
  }),
  getters: {},
  actions: {
    async findByURL(url: string) {
      this.lessonPlayer = await lessonsGateway.getByURL(url)
    }
  }
})
