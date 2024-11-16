import { BaseServices } from "../services/baseServices";
import { INewUser } from "../interfase/modelsInterfase";
import { Response, Request, NextFunction } from "express";
import NewUserSchema from "../models/NewUser";
import BaseController from "./baseController";
import { IController } from "../interfase/controllerInterface";
import bcrypt from "bcrypt";
import {
  BadRequestError,
  BaseCustomError,
  NotFoundError,
} from "../error/errorBase";
import JWT from "../utils/JWT";
import { ErrorCodeEnum } from "../error/errorCode";
import { createCookie } from "../utils/JWT";

class UserController extends BaseController implements IController {
  async create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, dateOfBirth }: INewUser = req.body;

      if (!name || !email || !password || !dateOfBirth) {
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
        createCookie(res, token);
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

        createCookie(res, token);

        return res.redirect("http://localhost:3000/personal");
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }

  async checkLogin(req: Request, res: Response) {
    const { password, email }: INewUser = req.body;
    if (!password && !email) {
      const err = new BadRequestError();
      res.status(err.statusCode).json(err);
    }
    try {
      const userServices = new BaseServices(NewUserSchema);
      const user = await userServices.getId(email, "email");
      if (user.length === 0) {
        const err = new NotFoundError();
        res.status(err.statusCode).json(err);
      } else {
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
          const token = JWT(user[0]);
          createCookie(res, token);
          res.status(200).json({
            msg: "Пользователь успешно авторизирован в личном кабинете",
          });
        } else {
          res
            .status(ErrorCodeEnum.UNAUTHORZED)
            .json({ msg: "Невверный пароль" });
        }
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
