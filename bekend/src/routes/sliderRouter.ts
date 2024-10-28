import { Router } from "express";
import { ImgController } from "../controllers/imgController";

const imgController = new ImgController();

const sliderRouter = Router();

sliderRouter.get("/getAll", imgController.read.bind(imgController));

export default sliderRouter;
