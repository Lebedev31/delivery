import { Router, Request, Response, NextFunction } from "express";
import categoryFoodController from "../controllers/categoryController";
const categoryRouter = Router();

categoryRouter.get(
  "/:id",
  categoryFoodController.read.bind(categoryFoodController)
);

export default categoryRouter;
