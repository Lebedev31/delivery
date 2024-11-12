import { BaseServices } from "../services/baseServices";
import { INewUser } from "../interfase/modelsInterfase";
import { Response, Request, NextFunction } from "express";
import NewUserSchema from "../models/NewUser";
import BaseController from "./baseController";
import { IController } from "../interfase/controllerInterface";
import bcrypt from "bcrypt";
import { BadRequestError, BaseCustomError } from "../error/errorBase";
import JWT from "../utils/JWT";
import { ErrorCodeEnum } from "../error/errorCode";

class UserController extends BaseController implements IController {
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
        const token = JWT(newUser);

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          sameSite: "strict",
        });
        this.sendRes(res, 201, "Пользователь создан");
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }

  read(req: Request, res: Response, next?: NextFunction) {
    try {
      const user = req.user as INewUser;

      if (!user) {
        const error = new BaseCustomError(
          "Произошла серверная ошибка",
          ErrorCodeEnum.INTERVAL_SERVER_ERROR,
          "INTERVAL_SERVER_ERROR"
        );
        res.status(500).json(error);
      } else {
        const token = JWT(user);

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          sameSite: "strict",
        });

        return res.redirect("http://localhost:3000/register");
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }

  checkAuth;
}

const userController = new UserController();

export default userController;
