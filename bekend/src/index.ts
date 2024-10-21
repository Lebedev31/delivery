import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbMongoConnect from "./db";
import path = require("path");
import sliderRouter from "./routes/sliderRouter";
import popularFoodRouter from "./routes/popularRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
dbMongoConnect();
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/popular", popularFoodRouter);
app.use("/apiSlider", sliderRouter);

app.listen(port, () => {
  console.log(`Сервер на порту ${port} запущен`);
});
