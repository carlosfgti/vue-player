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
    const token = localStorage.getItem('_oauth')
    const response = await this.httpClient
      .get('/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem('_oauth')
        }
      })
    const { url, name, blocked, email } = response.data.data

    return new User(
      url,
      name,
      email,
      !!blocked
      // data.image,
    )
  }

  async login(email: string, password: string): Promise<any> {
    const device_name = 'vue_app'
    return await this.httpClient
      .post('/login', { email, password, device_name })
      .then((response) => localStorage.setItem('_oauth', response.data.token))
  }

  async logout(): Promise<void> {
    await this.httpClient.post('/logout', {})
  }

  async block(): Promise<void> {
    const token = localStorage.getItem('_oauth')
    await this.httpClient.post(
      '/block',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
