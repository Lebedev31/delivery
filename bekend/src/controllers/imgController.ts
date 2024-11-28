import BaseController from "./baseController";
import { Response, Request, NextFunction } from "express";
import SliderShema from "../models/SliderShema";
import { IController } from "../interfase/controllerInterface";
import { BaseServices } from "../services/baseServices";
import { ISliderCollection } from "../interfase/modelsInterfase";
import { BadRequestError } from "../error/errorBase";

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

  async create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> {
    if (!req.body || !req.file) {
      const error = new BadRequestError();
      res
        .status(error.statusCode)
        .json({ message: "Неккоректные данные формы" });
    }
    const { description, title, weight, price }: ISliderCollection = req.body;
    const file = req.file;

    if (
      description === "" ||
      title === "" ||
      weight === "" ||
      price === "" ||
      !file
    ) {
      const error = new BadRequestError();
      res
        .status(error.statusCode)
        .json({ message: "Неккоректные данные формы" });
    }

    try {
      const sliderServices = new BaseServices(SliderShema);
    } catch (error) {}
  }
}
