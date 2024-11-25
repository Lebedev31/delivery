import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../error/errorBase";
import { examinationCustomError } from "../error/errorBase";
import { BaseCustomError } from "../error/errorBase";
import jwt from "jsonwebtoken";
import { INewUser } from "../interfase/modelsInterfase";

class AuthCheck {
  static checkTokenJwt(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string | undefined = req.cookies?.token;
      if (!token) {
        req.msg = "/login";
        next();
      } else {
        const SECRET = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, SECRET) as INewUser;
        req.msg = "/personal";
        req.email = decoded.email;
        next();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "JsonWebTokenError") {
          const err = new UnauthorizedError();
          res.status(err.statusCode).json(err);
        } else {
          const err = examinationCustomError(error) as BaseCustomError;
          res.status(err.statusCode).json(err);
        }
      }
    }
  }
}

export default AuthCheck;
