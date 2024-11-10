import jwt from "jsonwebtoken";
import { INewUser } from "../interfase/modelsInterfase";

const secret = process.env.JWT_SECRET as string;

function JWT(user: INewUser): string {
  const payload = {
    userEmail: user.email,
    userName: user.name,
  };

  const jwtSign = jwt.sign(payload, secret, { expiresIn: "1h" });

  return jwtSign;
}

export default JWT;
