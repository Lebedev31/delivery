import { ImgController } from "./imgController";
import { Response, Request } from "express";
import { PopularFoodServices } from "../services/imgServices";
import PopularFoodsSchema from "../models/SliderShema";
import { IPopularFoods } from "../interfase/modelsInterfase";

class PopularFoodController extends ImgController<IPopularFoods> {
  override async read(req: Request, res: Response): Promise<void> {
    try {
      const sliderServices = new PopularFoodServices(PopularFoodsSchema);
      const collection = await sliderServices.getAll();
      this.sendRes(res, 200, collection);
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(401, error, res);
      }
    }
  }
}

const popularFoodController = new PopularFoodController(PopularFoodsSchema);

export default popularFoodController;
