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
    return await this.axiosInstance.post(url, body)
  }

  async get(url: string): Promise<any> {
    return await this.axiosInstance.get(url)
  }
}
