import Course from "@/entities/Course";
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

    async get(id: string): Promise<Course> {
        const response = await this.httpClient.get(`${this.baseUrl}/${id}`);
        const data = response.data;
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
        );
    }

    getAll(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }
}