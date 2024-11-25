import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      msg?: string; // или любой другой тип
      email?: string;
    }
  }
}
