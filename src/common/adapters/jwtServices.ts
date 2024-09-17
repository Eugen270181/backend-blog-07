import {appConfig} from "../settings/config";
import jwt, {JwtPayload} from 'jsonwebtoken'



export const jwtServices = {
    async createJWT(userId:string){
        return jwt.sign({userId},appConfig.AT_SECRET,{expiresIn:appConfig.AT_TIME})
    },
    async getUserIdByToken(token:string){
        try {
            const result = await jwt.verify(token, appConfig.AT_SECRET) as JwtPayload
            return result.userId
        }
        catch (e) {
            return null
        }
    }
}