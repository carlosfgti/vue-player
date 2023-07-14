import type Course from "@/entities/Course";

export default interface CoursesGateway {
    get(): Promise<Course[]>;
}
