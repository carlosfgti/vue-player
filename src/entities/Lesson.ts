import type Module from './Module'

export default class Lesson {
  constructor(
    readonly name: string,
    readonly url: string,
    readonly video: string,
    readonly published: boolean,
    readonly description: string,
    readonly date: string,
    readonly duration: string,
    readonly origin: string,
    readonly free: boolean,
    readonly created_at: string,
    readonly views: number,
    readonly module?: Module
  ) {}
}
