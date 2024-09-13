import {appConfig} from "../settings/config";
import jwt, {JwtPayload} from 'jsonwebtoken'



export const jwtServices = {
    async createJWT(userId:string){
        return jwt.sign({userId},appConfig.SECRET_KEY,{expiresIn:'1h'})
    },
    async getUserIdByToken(token:string){
        try {
            const result = await jwt.verify(token, appConfig.SECRET_KEY) as JwtPayload
            return result.userId
        }
        catch (e) {
            return null
        }
    }
}