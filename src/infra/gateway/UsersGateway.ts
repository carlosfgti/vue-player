import type User from '@/entities/User'

export default interface UsersGateway {
  getMe(): Promise<User>
  login(email: string, password: string): Promise<any>
  logout(): Promise<any>
}
