import Course from '@/entities/Course'

export type MyCourseType = {
  data: Course[]
  meta: {
    total: number
    currentPage: number
    nextPage: number
    previousPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
