import { MongoError } from "mongodb";
import { ErrorCodeEnum } from "./errorCode";

export enum MongoErrorCode {
  VALIDATION_FAILED = 121,
  DOCUMENT_NOT_FOUND = 2,
  NETWORK_TIMEOUT = 89,
  WRITE_CONFLICT = 112,
}

export class MongoDbError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: number | undefined | string
  ) {
    super(message);
    this.name = "MongoDBError";
    Object.setPrototypeOf(this, MongoDbError.prototype);
  }
}

export class ValidationError extends MongoDbError {
  constructor() {
    super(
      "Ошибка валидации",
      ErrorCodeEnum.BAD_REQUEST,
      MongoErrorCode.VALIDATION_FAILED
    );
  }
}

export class DocumentNotFoundError extends MongoDbError {
  constructor() {
    super(
      "Документа не существует",
      ErrorCodeEnum.NOT_FOUND,
      MongoErrorCode.DOCUMENT_NOT_FOUND
    );
  }
}

export class NetworkError extends MongoDbError {
  constructor() {
    super(
      "Подключение разорвано",
      ErrorCodeEnum.INTERVAL_SERVER_ERROR,
      MongoErrorCode.NETWORK_TIMEOUT
    );
  }
}

export function examinationMongoError(error: Error | MongoError) {
  if (error instanceof MongoError) {
    switch (error.code) {
      case MongoErrorCode.DOCUMENT_NOT_FOUND:
        return new DocumentNotFoundError();

      case MongoErrorCode.NETWORK_TIMEOUT:
        return new NetworkError();

      case MongoErrorCode.VALIDATION_FAILED:
        return new ValidationError();

      default:
        return new MongoDbError(
          "Неизвестная ошибка Mongo",
          ErrorCodeEnum.INTERVAL_SERVER_ERROR,
          error.code
        );
    }
  }

  return error;
}
