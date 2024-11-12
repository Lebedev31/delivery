import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbMongoConnect from "./db";
import path from "path";
import sliderRouter from "./routes/sliderRouter";
import popularFoodRouter from "./routes/popularRouter";
import categoryRouter from "./routes/categoryRouter";
import formRouter from "./routes/formRouter";
import cookieParser from "cookie-parser";
import registerSocailRouter from "./routes/registerSocialRouter";
import setupGoogleStrategy from "./config/passportConfig";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000", // URL вашего React приложения
    credentials: true, // Важно для работы с куками
  })
);
app.use(cookieParser());
app.use(express.json());
setupGoogleStrategy();
dbMongoConnect();
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/popular", popularFoodRouter);
app.use("/apiSlider", sliderRouter);
app.use("/category", categoryRouter);
app.use("/form", formRouter);
app.use("/auth", registerSocailRouter);

app.listen(port, () => {
  console.log(`Сервер на порту ${port} запущен`);
});
