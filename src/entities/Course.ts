export default class Course {
    constructor(
      readonly name: string,
      readonly url: string,
      readonly description: string,
      readonly certificate_time: string,
      readonly color: string,
      readonly origin: string,
      readonly video: string,
      readonly image: string,
      readonly img_social: string,
      readonly status: string,
      readonly free: boolean,
      readonly date: string,
    ) {}
  }