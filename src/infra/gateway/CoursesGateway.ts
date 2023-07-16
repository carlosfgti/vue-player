import type Course from '@/entities/Course'

export default interface CoursesGateway {
  getAll(): Promise<Course[]>
  get(id: string): Promise<Course>
}
