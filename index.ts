import express from "express";
import { AppDataSource } from "./src/config/data-source";
import { logEvents } from "./src/helpers/logEvents";
import { Post } from "./src/router/postRouter";
const PORT = process.env.PORT || 3000;

// thiết lập kết nối cơ sở dữ liệu
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use("/api/v1", Post);

app.use((err, req, res, next) => {
  logEvents(err.message);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});
