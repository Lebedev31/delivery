import { Router } from "express";
import popularFoodController from "../controllers/popularController";

const popularFoodRouter = Router();

popularFoodRouter.get(
  "/getAll",
  popularFoodController.read.bind(popularFoodController)
);

export default popularFoodRouter;
