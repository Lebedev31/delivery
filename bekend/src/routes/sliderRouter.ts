import { Router } from "express";
import { ImgController } from "../controllers/imgController";
import upload from "../middleware/multer";

const imgController = new ImgController();

const sliderRouter = Router();

sliderRouter.get("/getAll", imgController.read.bind(imgController));

sliderRouter.post(
  "/createSlide",
  upload.single("image"),
  imgController.create.bind(imgController)
);

sliderRouter.patch("/updateSlide");

sliderRouter.delete("deleteSlide");

export default sliderRouter;
