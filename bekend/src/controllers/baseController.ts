import { IController } from "../interfase/controllerInterface";
import { Request, Response, NextFunction } from "express";

abstract class BaseController<T> implements IController<T> {
  abstract create?(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void>;
  abstract read?(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void>;
  abstract delete?(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void>;
  abstract update?(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void>;

  protected sendRes<T>(res: Response, status: number, data: T) {
    res.status(status).json({ status, data });
  }

  protected handleError(status: number, err: Error, res: Response) {
    const message = err.message;
    res.status(status).json({ status, message });
  }
}

export default BaseController;
