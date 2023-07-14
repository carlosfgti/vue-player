import type Course from "@/entities/Course";
import type CoursesGateway from "./CoursesGateway";
import type HttpClient from "../http/HttpClient";

export default class CoursesGatewayHttp implements CoursesGateway {
    constructor (
		readonly httpClient: HttpClient,
		readonly baseUrl: string
	) {}

    get(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }
}