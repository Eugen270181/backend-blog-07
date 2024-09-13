import {app} from './app'
import {connectToDB} from "./common/module/db/dbMongo";
import {appConfig} from './common/settings/config'
const startApp = async()=>{
    await connectToDB()
    app.listen(appConfig.PORT, ()=>{
        console.log(`starting on port:${appConfig.PORT}`)
    })
}

startApp()
