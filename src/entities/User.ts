export default class User {
  constructor(
    readonly url: string,
    readonly name: string,
    readonly email: string,
    readonly image?: string
  ) {}
}
