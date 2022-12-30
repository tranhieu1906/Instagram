import express from "express";
import {AppDataSource} from "./src/config/data-source";
const PORT = 3000;

// thiết lập kết nối cơ sở dữ liệu
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();



app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})
