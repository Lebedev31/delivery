import jwt from "jsonwebtoken";
import { INewUser } from "../interfase/modelsInterfase";
import { Response } from "express";

const secret = process.env.JWT_SECRET as string;

function JWT(user: INewUser): string {
  const payload = {
    email: user.email,
    name: user.name,
  };

  const jwtSign = jwt.sign(payload, secret, { expiresIn: "1h" });

  return jwtSign;
}

export function createCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: false,
    //  sameSite: "strict",
  });
}

export default JWT;
