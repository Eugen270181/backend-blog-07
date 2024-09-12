import {UserDbModel} from "./db/user-db.model";
import {WithId} from "mongodb";


declare global {
    declare namespace Express {
        export interface Request {
            user: {
                userId?: string
            }
        }
    }
}