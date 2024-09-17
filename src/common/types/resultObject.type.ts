import {StatusCode} from "./enum/resultStatusCode.type";

export type ResultObject<T> = {
    data?:T,
    statusCode:StatusCode
}