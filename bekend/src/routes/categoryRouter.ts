import { Router } from "express";
import categoryFoodController from "../controllers/categoryController";
const categoryRouter = Router();

categoryRouter.get(
  "/:id",
  categoryFoodController.read.bind(categoryFoodController)
);

categoryRouter.get(
  "/getAllSearchName/:id",
  categoryFoodController.searchNameFood.bind(categoryFoodController)
);

export default categoryRouter;
