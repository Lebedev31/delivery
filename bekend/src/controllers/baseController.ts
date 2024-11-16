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
      const msg = err.message;
      const status = err.statusCode;
      const statusError = err.code;
      const nameError = err.name;
      res.status(status).json({ msg, nameError, statusError });
    }

    if (err instanceof BaseCustomError) {
      const baseError = examinationCustomError(err);

      if (baseError instanceof BaseCustomError) {
        const msg = baseError.message;
        const status = baseError.statusCode;
        const statusError = baseError.statusCode;
        const nameError = baseError.name;
        res.status(status).json({ msg, nameError, statusError });
      }
    }
  }
}

export default BaseController;
