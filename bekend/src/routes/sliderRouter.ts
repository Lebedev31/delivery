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

sliderRouter.patch(
  "/updateSlide",
  upload.single("image"),
  imgController.update.bind(imgController)
);

sliderRouter.delete(
  "/deleteSlide:id",
  imgController.delete.bind(imgController)
);

export default sliderRouter;
