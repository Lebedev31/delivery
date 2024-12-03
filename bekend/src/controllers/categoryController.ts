import { Response, Request } from "express";
import CategoryFoodSchema from "../models/CategoryFood";
import { ErrorCodeEnum } from "../error/errorCode";
import { IController } from "../interfase/controllerInterface";
import BaseController from "./baseController";
import { ICategoryFood } from "../interfase/modelsInterfase";
import { BaseServices } from "../services/baseServices";
import { BadRequestError } from "../error/errorBase";


class CategoryFoodController extends BaseController implements IController {
  async read(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      res.status(ErrorCodeEnum.BAD_REQUEST).json({ msg: "Неправильный id" });
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

  async searchNameFood(req: Request, res: Response): Promise<void> {
     const id = req.params.id;
     console.log(id)
     if(!id){
       const error = new BadRequestError();
       res.status(error.statusCode).json({ msg: "Неправильный id" });
     }

     try {
      const categorySercvices = new BaseServices(CategoryFoodSchema);
      const result = await categorySercvices.searchGetAll(id);
      this.sendRes(res, 200, result);
      
     } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
     }
  
  }
}

const categoryFoodController = new CategoryFoodController();

export default categoryFoodController;
