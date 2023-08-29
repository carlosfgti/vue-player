import Course from '@/entities/Course'
import type CoursesGateway from './CoursesGateway'
import type HttpClient from '../http/HttpClient'
import AxiosAdapter from '../http/AxiosAdapter'
import Module from '@/entities/Module'
import type { MyCourseType } from '@/types'
import Lesson from '@/entities/Lesson'

export default class CoursesGatewayHttp implements CoursesGateway {
  private httpClient: HttpClient

  constructor(readonly baseUrl: string) {
    this.httpClient = new AxiosAdapter()
  }

  async get(id: string): Promise<Course> {
    const token = localStorage.getItem('_oauth')
    const response = await this.httpClient.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data.data
    return new Course(
      data.name,
      data.url,
      data.description,
      data.certificate_time,
      data.color,
      data.origin,
      data.video,
      data.image,
      data.img_social,
      data.status,
      data.free,
      data.date,
      data.modules
    )
  }

  async getAll(): Promise<Course[]> {
    const response = await this.httpClient.get(this.baseUrl)
    const coursesData = JSON.parse(response.data)

    // Map the coursesData array to an array of Course objects
    const courses: Course[] = coursesData.map((courseData: any) => {
      const {
        name,
        url,
        description,
        certificate_time,
        color,
        origin,
        video,
        image,
        img_social,
        status,
        free,
        date,
        modules
      } = courseData

      // Map the modules array to an array of Module objects
      const courseModules: Module[] = modules.map((moduleData: any) => {
        const { moduleName, moduleDuration } = moduleData
        return new Module(moduleName, moduleDuration)
      })

      return new Course(
        name,
        url,
        description,
        certificate_time,
        color,
        origin,
        video,
        image,
        img_social,
        status,
        free,
        date,
        courseModules
      )
    })

    return courses
  }

  async getMyCourses(params: { page: number; filter?: string }): Promise<MyCourseType> {
    const token = localStorage.getItem('_oauth')
    const response = await this.httpClient.get('/my-courses', {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const { data, meta } = response.data

    // Map the coursesData array to an array of Course objects
    const courses: Course[] = data.map((courseData: any) => {
      const {
        name,
        url,
        description,
        certificate_time,
        color,
        origin,
        video,
        image,
        img_social,
        status,
        free,
        date,
        modules
      } = courseData

      // Map the modules array to an array of Module objects
      const courseModules: Module[] = modules.map((moduleData: any) => {
        const lessons = moduleData.lessons.map((lessonData: any) => {
          const {
            name,
            url,
            video,
            published,
            description,
            date,
            duration,
            origin,
            free,
            created_at,
            views
          } = lessonData
          return new Lesson(
            name,
            url,
            video,
            published,
            description,
            date,
            duration,
            origin,
            free,
            created_at,
            views
          )
        })
        const { name, description } = moduleData
        return new Module(name, description, lessons)
      })

      return new Course(
        name,
        url,
        description,
        certificate_time,
        color,
        origin,
        video,
        image,
        img_social,
        status,
        free,
        date,
        courseModules
      )
    })

    return {
      data: courses,
      meta: {
        total: meta.total,
        currentPage: meta.current_page,
        nextPage: meta.current_page + 1 <= meta.last_page ? meta.current_page + 1 : null,
        previousPage: meta.current_page - 1 > 0 ? meta.current_page - 1 : null,
        hasNextPage: meta.current_page + 1 <= meta.last_page,
        hasPreviousPage: meta.current_page - 1 > 0,
        lastPage: meta.last_page,
        totalPerPage: meta.to
      }
    }
  }

  async generateCertificate(course: Course): Promise<any> {
    const token = localStorage.getItem('_oauth')
    return await this.httpClient.post(
      '/generate-certificate',
      { course: course.url },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  async getCertificate(identify: string): Promise<any> {
    return await this.httpClient.get(`/certificate/${identify}`)
  }
}
