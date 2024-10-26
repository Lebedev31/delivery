import { ErrorCodeEnum } from "./errorCode";

export class BaseCustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, BaseCustomError);
  }
}

export class BadRequestError extends BaseCustomError {
  constructor() {
    super("Неверный запрос", ErrorCodeEnum.BAD_REQUEST, "BAD_REQUEST");
  }
}

export class UnauthorizedError extends BaseCustomError {
  constructor(message = "Требуется авторизация") {
    super("Требуется авторизаця", ErrorCodeEnum.UNAUTHORZED, "UNAUTHORZED");
  }
}

export class ForbiddenError extends BaseCustomError {
  constructor() {
    super("Доступ запрщен", ErrorCodeEnum.FORBIDDEN, "FORBIDDEN");
  }
}

export class NotFoundError extends BaseCustomError {
  constructor() {
    super("Ресурс не найден", ErrorCodeEnum.NOT_FOUND, "NOT_FOUND");
  }
}

export function examinationCustomError(error: Error | BaseCustomError) {
  if (error instanceof BaseCustomError) {
    switch (error.name) {
      case "BAD_REQUEST":
        return new BadRequestError();

      case "UNAUTHORZED":
        return new UnauthorizedError();

      case "FORBIDDEN":
        return new ForbiddenError();

      case "NOT_FOUND":
        return new NotFoundError();

      default:
        return new BaseCustomError(
          "Неизвестная ошибка",
          ErrorCodeEnum.INTERVAL_SERVER_ERROR,
          error.code
        );
    }
  }

  return error;
}
