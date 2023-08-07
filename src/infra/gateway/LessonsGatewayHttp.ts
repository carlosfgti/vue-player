import Lesson from '@/entities/Lesson'
import type LessonsGateway from './LessonsGateway'
import AxiosAdapter from '../http/AxiosAdapter'
import type HttpClient from '../http/HttpClient'

export default class LessonsGatewayHttp implements LessonsGateway {
  private httpClient: HttpClient

  constructor(readonly baseUrl: string) {
    this.httpClient = new AxiosAdapter()
  }

  async getByURL(url: string): Promise<Lesson> {
    const response = await this.httpClient.get(`${this.baseUrl}/${url}`)
    const data = response.data
    return new Lesson(
      data.name,
      data.url,
      data.video,
      data.published,
      data.description,
      data.date,
      data.duration,
      data.origin,
      data.free,
      data.created_at,
      data.views,
      data.module
    )
  }
}
