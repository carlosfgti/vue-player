import type User from '@/entities/User'
import UsersGatewayHttp from '@/infra/gateway/UsersGatewayHttp'
import { defineStore } from 'pinia'

const usersGateway = new UsersGatewayHttp()

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: null as null | User
  }),
  actions: {
    async getMe() {
      this.user = await usersGateway.getMe()
    },
    async login(email: string, password: string) {
      await usersGateway.login(email, password)
    },
    async logout() {
      await usersGateway.logout()
    }
  }
})
