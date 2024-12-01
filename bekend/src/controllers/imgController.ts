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
      const newSlide: ISliderCollection = {
        description,
        title,
        weight,
        price,
        imgPath: "img/" + file?.filename,
      };

      const sliderServices = new BaseServices(SliderShema);
      const createNewSlider = await sliderServices.create(newSlide);

      if (createNewSlider) {
        this.sendRes(res, 201, "Слайд создан");
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }

  async update(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> {
    const updateSlide: ISliderCollection = req.body;
    const file = req.file;

    if (!updateSlide && !file) {
      const error = new BadRequestError();
      res.status(error.statusCode).json({ message: "Неверные данные" });
    }

    try {
      const isFile = file ? true : false;
      const deletePropertyId = Object.assign({}, updateSlide);
      delete deletePropertyId._id;
      const updateObject: Partial<ISliderCollection> = {
        ...deletePropertyId,
        ...(isFile ? { imgPath: "img/" + file?.filename } : {}),
      };
      if (updateSlide._id) {
        const updateServices = new BaseServices(SliderShema);

        const updateSlider = await updateServices.update(
          updateSlide._id,
          updateObject
        );

        if (updateSlider) {
          this.sendRes(res, 200, "Слайд обновлен");
        }
      }
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
    if (!req.params) {
      const error = new BadRequestError();
      res.status(error.statusCode).json({ message: "Неверный запрос" });
    }

    try {
      const deleteServices = new BaseServices(SliderShema);
      if (req.params) {
        const del = await deleteServices.delete(req.params.id);
        this.sendRes(res, 200, "Пользователь удален");
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }
}
