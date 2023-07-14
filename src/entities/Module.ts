import type Lesson from "./Lesson";

export default class Module {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly lessons ?: Lesson[]
    ) {}
}