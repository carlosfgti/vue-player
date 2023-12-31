export default interface HttpClient {
  get(url: string, configs?: object): Promise<any>
  post(url: string, body: any, configs?: object): Promise<any>
}
