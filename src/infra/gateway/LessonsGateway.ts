import type Lesson from '@/entities/Lesson'

export default interface LessonsGateway {
  getByURL(url: string): Promise<Lesson>
}
