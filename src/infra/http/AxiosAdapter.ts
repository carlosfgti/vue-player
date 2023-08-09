import axios, { type AxiosInstance } from 'axios'
import type HttpClient from './HttpClient'

export default class AxiosAdapter implements HttpClient {
  private axiosInstance: AxiosInstance

  constructor() {
    const baseURL = 'http://localhost/ead'
    this.axiosInstance = axios.create({
      baseURL
    })
  }

  async post(url: string, body: any): Promise<any> {
    const response = await this.axiosInstance.post(url, body)
    return response.data
  }

  async get(url: string): Promise<any> {
    const response = await this.axiosInstance.get(url)
    return response.data
  }
}
