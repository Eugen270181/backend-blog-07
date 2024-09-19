import {StatusCode} from "./enum/result-StatusCode-type";

export type ResultObject<T> = {
    data?:T,
    statusCode:StatusCode
}