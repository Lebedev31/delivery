import BaseController from "./baseController";
import { Response, Request, NextFunction } from "express";
import SliderShema from "../models/SliderShema";
import { ISliderCollection } from "../interfase/modelsInterfase";
import { IController } from "../interfase/controllerInterface";
import { BaseServices } from "../services/baseServices";

export class ImgController extends BaseController implements IController {
  async read(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const sliderServices = new BaseServices(SliderShema);
      const collection = await sliderServices.getAll();
      this.sendRes(res, 200, collection);
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }
}
