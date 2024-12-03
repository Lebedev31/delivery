import { BaseServices } from "../services/baseServices";
import { Response, Request, NextFunction } from "express";
import NewUserSchema from "../models/NewUser";
import BaseController from "./baseController";
import { IController } from "../interfase/controllerInterface";
import { UnauthorizedError, BadRequestError } from "../error/errorBase";
import { ErrorCodeEnum } from "../error/errorCode";
import {deleteFile} from '../utils/deleteImg';

class PersonalArea extends BaseController implements IController {
  async read(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const email = req.email;
      if (!email) {
        const error = new UnauthorizedError();
        this.handleError(error, res);
      } else {
        const userModel = new BaseServices(NewUserSchema);
        const user = await userModel.getId(email, "email");
        const isAvatar = user[0].avatar === undefined ? false : true; 

        if (user.length > 0) {
          const info = {
            name: user[0].name,
            _id: user[0]._id,
            dateOfBirth: user[0].dateOfBirth,
            ...(isAvatar ? {avatar: user[0].avatar} : {})
          };
          this.sendRes(res, 200, info);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }

  async updateAvatar(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const id = req.body.id;
      if (!id) {
        const error = new BadRequestError();
        res.status(error.statusCode).json({ msg: 'Нет id' });
      }

      const userModel = new BaseServices(NewUserSchema);
      const avatarPath = req.file?.filename;
      const searchImg = await userModel.getId(id, "_id").then((res) => res[0].avatar);
      
      
      if (!avatarPath) {
        const error = new BadRequestError();
        res.status(error.statusCode).json({ msg: 'Нет аватарки' });
      }
       const result = await userModel.update(
        id,
        { avatar: `img/${avatarPath}` }
      );

      if (searchImg) {
        deleteFile(searchImg);
      }
      this.sendRes(res, 200, { msg: 'Аватар обновлен' });
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }

  redirectNavigation(req: Request, res: Response) {
    const redirect = req.msg;
    if (!redirect) {
      const error = new UnauthorizedError();
      res.status(error.statusCode).json(error);
    }

    try {
      if (redirect === "/login") {
        res.status(ErrorCodeEnum.UNAUTHORZED).json({ msg: redirect });
      }

      if (redirect === "/personal") {
        res.status(200).json({ msg: redirect });
      }
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error, res);
      }
    }
  }
}

const personalAreaController = new PersonalArea();

export default personalAreaController;
