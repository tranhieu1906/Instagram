const fs = require('fs').promises
import path from "path"
import { format } from "date-fns"

const fileName =  path.join(__dirname,"../Logs","logs.log")
export const logEvents = async (msg) =>{
    const dateTime = `${format(new Date(),'ddMMyyyy\tss:mm:HH')}`
    const contentLog = `${dateTime}----${msg}\n`
    try {
        fs.appendFile(fileName, contentLog);
    } catch (error) {
        console.log(error)
    }
}
