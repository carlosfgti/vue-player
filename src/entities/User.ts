export default class User {
  constructor(
    readonly url: string,
    readonly name: string,
    readonly email: string,
    readonly blocked: boolean,
    readonly image?: string
  ) {}
}
