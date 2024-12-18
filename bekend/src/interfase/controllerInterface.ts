import { Response, Request, NextFunction } from "express";
export interface IController {
  create?(req: Request, res: Response, next?: NextFunction): Promise<void>;
  read?(req: Request, res: Response, next?: NextFunction): void;
  update?(req: Request, res: Response, next?: NextFunction): Promise<void>;
  delete?(req: Request, res: Response, next?: NextFunction): Promise<void>;
}
