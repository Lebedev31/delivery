import { ImgController } from "./imgController";
import { Response, Request } from "express";
import { CategoryMenuServices } from "../services/imgServices";
import CategoryFoodSchema from "../models/CategoryFood";
import { ErrorCodeEnum } from "../error/errorCode";

type RequestParam = {
  id: string;
};

class CategoryFoodController extends ImgController {
  override async read(
    req: Request<RequestParam>,
    res: Response
  ): Promise<void> {
    if (!req.params.id) {
      res
        .status(ErrorCodeEnum.BAD_REQUEST)
        .json({ message: "Неправильный id" });
    }

    const id = req.params.id;

    try {
      const categoryServices = new CategoryMenuServices(CategoryFoodSchema);
      const collection = await categoryServices.getId(id);
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
