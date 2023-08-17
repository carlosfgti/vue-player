import Course from '@/entities/Course'

export type MyCourseType = {
  data: Course[]
  meta: {
    total: number
    currentPage: number
    nextPage: number | null
    previousPage: number | null
    hasNextPage: boolean
    hasPreviousPage: boolean
    lastPage: number
    totalPerPage: number
  }
}
