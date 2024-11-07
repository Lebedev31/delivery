import { Request, Response, NextFunction } from "express";
import { ErrorCodeEnum } from "../error/errorCode";
import { validationResult } from "express-validator";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(ErrorCodeEnum.BAD_REQUEST).json({ errors: errors.array() });
  } else {
    next();
  }
};
export default validate;
