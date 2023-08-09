import User from '@/entities/User'
import type UsersGateway from './UsersGateway'
import AxiosAdapter from '../http/AxiosAdapter'
import type HttpClient from '../http/HttpClient'

export default class UsersGatewayHttp implements UsersGateway {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new AxiosAdapter()
  }

  async getMe(): Promise<User> {
    const response = await this.httpClient.get('/me')
    const data = response.data

    return new User(
      data.name,
      data.email
      // data.image,
    )
  }

  async login(email: string, password: string): Promise<void> {
    const response = await this.httpClient.post('/login', { email, password })
    console.log(response.data)
  }

  async logout(): Promise<void> {
    await this.httpClient.post('/logout', {})
  }
}
