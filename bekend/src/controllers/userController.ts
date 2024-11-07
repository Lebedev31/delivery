import { BaseServices } from "../services/baseServices";
import { INewUser } from "../interfase/modelsInterfase";
import { Response, Request, NextFunction } from "express";
import NewUserSchema from "../models/NewUser";
import BaseController from "./baseController";
import { IController } from "../interfase/controllerInterface";
import bcrypt from "bcrypt";
import { BadRequestError } from "../error/errorBase";

class UserController extends BaseController<INewUser> implements IController {
  async create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, dateOfBirth }: INewUser = req.body;

      if (!name && !email && !password && !dateOfBirth) {
        const error = new BadRequestError();
        res.status(error.statusCode).json(error);
      }

      const saltRound = 10;
      const hashePassword = await bcrypt.hash(password, saltRound);

      const userServices = new BaseServices(NewUserSchema);
      const newUser = await userServices.create({
        name,
        email,
        dateOfBirth,
        password: hashePassword,
      });

      if (newUser) {
        this.sendRes(res, 201, "Пользователь создан");
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }
}

const userController = new UserController();

export default userController;
