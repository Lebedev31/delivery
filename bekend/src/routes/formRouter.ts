import { Router } from "express";
import ValidationForm from "../middleware/validationForm";
import validate from "../middleware/validate";
import userController from "../controllers/userController";
import AuthCheck from "../middleware/authCheck";

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

formRouter.get("/personal", AuthCheck.checkTokenJwt);

export default formRouter;
