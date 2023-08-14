import type Course from '@/entities/Course'
import type { MyCourseType } from '@/types'

export default interface CoursesGateway {
  getAll(): Promise<Course[]>
  get(id: string): Promise<Course>
  getMyCourses(): Promise<MyCourseType>
}
