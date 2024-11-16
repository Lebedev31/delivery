import { Router, Request, Response } from "express";
import passport from "passport";
import ChekEnvVariables from "../middleware/checkEnvVariables";
import userController from "../controllers/userController";

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
  userController.read.bind(userController)
);

registerSocailRouter.get(
  "/yandex",
  ChekEnvVariables.check,
  passport.authenticate("yandex", {
    scope: ["login:info", "login:email"],
  })
);

registerSocailRouter.get(
  "/yandex/callback",
  ChekEnvVariables.check,
  passport.authenticate("yandex", {
    session: false,
    failureRedirect: "/register",
  }),
  userController.read.bind(userController)
);

export default registerSocailRouter;
