export default class User {
  constructor(
    readonly url: string,
    readonly name: string,
    readonly email: string,
    public blocked: boolean,
    readonly image?: string
  ) {}

  block() {
    this.blocked = true
  }
}
