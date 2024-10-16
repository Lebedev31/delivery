import BaseController from "./baseController";
import { Response, Request, NextFunction } from "express";
import { SliderServices } from "../services/sliderServices";

export class ImgController<
  ISliderCollection,
> extends BaseController<ISliderCollection> {
  async read(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const sliderServices = new SliderServices<ISliderCollection>();
      const collection = await sliderServices.getAll();
      this.sendRes(res, 200, collection);
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(401, error, res);
      }
    }
  }

  async delete(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
