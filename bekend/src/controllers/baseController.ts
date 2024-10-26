import { IController } from "../interfase/controllerInterface";
import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
import { MongoDbError } from "../error/errorMongo";
import { BaseCustomError } from "../error/errorBase";
import { examinationCustomError } from "../error/errorBase";

abstract class BaseController<T> implements IController {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  abstract create?(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void>;
  abstract read?(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void>;
  abstract delete?(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void>;
  abstract update?(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void>;

  protected sendRes<T>(res: Response, status: number, data: T) {
    res.status(status).json({ status, data });
  }

  protected handleError(err: Error, res: Response) {
    if (err instanceof MongoDbError) {
      const message = err.message;
      const status = err.statusCode;
      const mongoStatusError = err.code;
      const nameError = err.name;
      res.status(status).json({ message, nameError, mongoStatusError });
    }

    if (err instanceof BaseCustomError) {
      const baseError = examinationCustomError(err);

      if (baseError instanceof BaseCustomError) {
        const message = baseError.message;
        const status = baseError.statusCode;
        const statusError = baseError.code;
        const nameError = baseError.name;
        res.status(status).json({ message, nameError, statusError });
      }
    }
  }
}

export default BaseController;
