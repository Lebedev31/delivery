import { Router } from "express";
import ValidationForm from "../middleware/validationForm";
import validate from "../middleware/validate";
import userController from "../controllers/userController";

const formRouter = Router();

formRouter.post(
  "/createUser",
  ValidationForm.validationUser(),
  validate,
  userController.create.bind(userController)
);

formRouter.post(
  "/login",
  ValidationForm.validationLogin(),
  validate,
  userController.checkLogin.bind(userController)
);

export default formRouter;
