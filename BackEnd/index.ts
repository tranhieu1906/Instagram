import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");
import Token from "./src/middlewares/jwt.middleware"
import { AppDataSource } from "./src/config/data-source";
import { Post } from "./src/router/postRouter";
import { User } from "./src/router/userRouter";

const PORT = process.env.PORT || 3000;

// thiết lập kết nối cơ sở dữ liệu
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err.message);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", User);
app.use(Token.veryfyAccessToken);
app.use("/api/v1", Post);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});
