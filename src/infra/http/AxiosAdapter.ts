import axios from 'axios'
import type HttpClient from './HttpClient'

export default class AxiosAdapter implements HttpClient {
  async post(url: string, body: any): Promise<any> {
    const response = await axios.post(url, body)
    return response.data
  }

  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }
}
