import { Router, Request, Response } from "express";
import passport from "passport";
import ChekEnvVariables from "../middleware/checkEnvVariables";
import JWT from "../utils/JWT";

const registerSocailRouter = Router();

registerSocailRouter.get(
  "/google",
  ChekEnvVariables.check,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

registerSocailRouter.get(
  "/google/callback",
  ChekEnvVariables.check,
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/register",
  }),

  (req: Request, res: Response) => {
    res.redirect("http://localhost:3000/register");
  }
);

export default registerSocailRouter;
