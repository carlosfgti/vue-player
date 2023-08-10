import Course from '@/entities/Course'
import type CoursesGateway from './CoursesGateway'
import type HttpClient from '../http/HttpClient'
import AxiosAdapter from '../http/AxiosAdapter'
import Module from '@/entities/Module'

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
}
