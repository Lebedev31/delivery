import { BaseServices } from "../services/baseServices";
import { Response, Request, NextFunction } from "express";
import NewUserSchema from "../models/NewUser";
import BaseController from "./baseController";
import { IController } from "../interfase/controllerInterface";
import { UnauthorizedError } from "../error/errorBase";
import { ErrorCodeEnum } from "../error/errorCode";

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

        if (user.length > 0) {
          const info = {
            email: user[0].email,
            name: user[0].name,
          };
          res.status(200).json(info);
        }
      }
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
