import { ImgController } from "./imgController";
import { Response, Request } from "express";
import { PopularFoodServices } from "../services/imgServices";
import PopularFoodsSchema from "../models/PopularFoods";

class PopularFoodController extends ImgController {
  constructor() {
    super(PopularFoodsSchema);
  }
  override async read(req: Request, res: Response): Promise<void> {
    try {
      const popularServices = new PopularFoodServices(PopularFoodsSchema);
      const collection = await popularServices.getAll();
      this.sendRes(res, 200, collection);
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(401, error, res);
      }
    }
  }
}

const popularFoodController = new PopularFoodController();

export default popularFoodController;
