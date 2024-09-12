import {app} from './app'
import {connectToDB} from "./common/module/db/dbMongo";
import {SETTINGS} from './settings'
const startApp = async()=>{
    await connectToDB()
    app.listen(SETTINGS.PORT, ()=>{
        console.log(`starting on port:${SETTINGS.PORT}`)
    })
}

startApp()
