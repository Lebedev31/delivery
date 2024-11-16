import dotenv from "dotenv";
import { BaseCustomError } from "../error/errorBase";
import { ErrorCodeEnum } from "../error/errorCode";
import { Request, Response, NextFunction } from "express";

dotenv.config();

class ChekEnvVariables {
  static check(req: Request, res: Response, next: NextFunction) {
    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.YANDEX_CLIENT_ID ||
      !process.env.YANDEX_CLIENT_SECRET
    ) {
      const error = new BaseCustomError(
        "Переменных окружения не существует",
        ErrorCodeEnum.INTERVAL_SERVER_ERROR,
        "INTERVAL_SERVER_ERROR"
      );
    } else {
      next();
    }
  }

  static chekJWTSecret(req: Request, res: Response, next: NextFunction) {
    if (!process.env.JWT_SECRET) {
      const error = new BaseCustomError(
        "Секрет JWT не существует",
        ErrorCodeEnum.INTERVAL_SERVER_ERROR,
        "INTERVAL_SERVER_ERROR"
      );
    } else {
      next();
    }
  }
}

export default ChekEnvVariables;
