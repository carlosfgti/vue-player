import axios, { type AxiosInstance } from 'axios'
import type HttpClient from './HttpClient'

export default class AxiosAdapter implements HttpClient {
  private axiosInstance: AxiosInstance

  constructor() {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost/ead'
    this.axiosInstance = axios.create({
      baseURL
    })
  }

  async post(url: string, body: any, configs?: object): Promise<any> {
    return await this.axiosInstance.post(url, body, configs)
  }

  async get(url: string, configs?: object): Promise<any> {
    return await this.axiosInstance.get(url, configs)
  }
}
