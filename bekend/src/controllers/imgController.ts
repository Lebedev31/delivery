import BaseController from "./baseController";
import { Response, Request, NextFunction } from "express";
import { SliderServices } from "../services/imgServices";
import SliderShema from "../models/SliderShema";
import { ISliderCollection } from "../interfase/modelsInterfase";

export class ImgController extends BaseController<ISliderCollection> {
  async read(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const sliderServices = new SliderServices(SliderShema);
      const collection = await sliderServices.getAll();
      this.sendRes(res, 200, collection);
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }

  async delete(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
