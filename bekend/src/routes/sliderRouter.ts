import { Router } from "express";
import { ImgController } from "../controllers/imgController";
import SliderShema from "../models/SliderShema";

const imgController = new ImgController(SliderShema);

const sliderRouter = Router();

sliderRouter.get("/getAll", imgController.read.bind(imgController));

export default sliderRouter;
