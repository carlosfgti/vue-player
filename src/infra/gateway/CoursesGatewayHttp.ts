import type Course from "@/entities/Course";
import type CoursesGateway from "./CoursesGateway";
import type HttpClient from "../http/HttpClient";
import AxiosAdapter from "../http/AxiosAdapter";

export default class CoursesGatewayHttp implements CoursesGateway {
    private httpClient: HttpClient;

    constructor (
		readonly baseUrl: string
	) {
        this.httpClient = new AxiosAdapter()
    }

    get(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }
}