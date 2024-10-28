import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbMongoConnect from "./db";
import path from "path";
import sliderRouter from "./routes/sliderRouter";
import popularFoodRouter from "./routes/popularRouter";
import categoryRouter from "./routes/categoryRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
dbMongoConnect();
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/popular", popularFoodRouter);
app.use("/apiSlider", sliderRouter);
app.use("/category", categoryRouter);

app.listen(port, () => {
  console.log(`Сервер на порту ${port} запущен`);
});
