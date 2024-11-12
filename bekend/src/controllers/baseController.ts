import { IController } from "../interfase/controllerInterface";
import { Request, Response, NextFunction } from "express";
import { MongoDbError } from "../error/errorMongo";
import { BaseCustomError } from "../error/errorBase";
import { examinationCustomError } from "../error/errorBase";

abstract class BaseController {
  protected sendRes<T>(res: Response, status: number, data: T | string) {
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
