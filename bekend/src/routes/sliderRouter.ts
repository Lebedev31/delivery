import { Router } from "express";
import { ImgController } from "../controllers/imgController";
import { ISliderCollection } from "../interfase/modelsInterfase";

const imgController = new ImgController<ISliderCollection>();

const sliderRouter = Router();

sliderRouter.get("/getAll", imgController.read.bind(imgController));

export default sliderRouter;
