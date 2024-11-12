import { Response, Request } from "express";
import PopularFoodsSchema from "../models/PopularFoods";
import BaseController from "./baseController";
import { IController } from "../interfase/controllerInterface";
import { BaseServices } from "../services/baseServices";

class PopularFoodController extends BaseController implements IController {
  async read(req: Request, res: Response): Promise<void> {
    try {
      const popularServices = new BaseServices(PopularFoodsSchema);
      const collection = await popularServices.getAll();
      this.sendRes(res, 200, collection);
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }
}

const popularFoodController = new PopularFoodController();

export default popularFoodController;
