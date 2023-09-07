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
      return await usersGateway.login(email, password)
    },
    async logout(): Promise<any> {
      return await usersGateway.logout().then(() => (this.user = null))
    },
    async block(): Promise<any> {
      this.user?.block()
      return await usersGateway.block()
    }
  }
})
