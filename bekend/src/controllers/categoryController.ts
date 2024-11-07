import { Response, Request } from "express";
import CategoryFoodSchema from "../models/CategoryFood";
import { ErrorCodeEnum } from "../error/errorCode";
import { IController } from "../interfase/controllerInterface";
import BaseController from "./baseController";
import { ICategoryFood } from "../interfase/modelsInterfase";
import { BaseServices } from "../services/baseServices";

type RequestParam = {
  id: string;
};

class CategoryFoodController
  extends BaseController<ICategoryFood>
  implements IController
{
  async read(req: Request<RequestParam>, res: Response): Promise<void> {
    if (!req.params.id) {
      res
        .status(ErrorCodeEnum.BAD_REQUEST)
        .json({ message: "Неправильный id" });
    }

    const id = req.params.id;

    try {
      const categoryServices = new BaseServices(CategoryFoodSchema);
      const collection = await categoryServices.getId(id, "category");
      this.sendRes(res, 200, collection);
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }
}

const categoryFoodController = new CategoryFoodController();

export default categoryFoodController;
