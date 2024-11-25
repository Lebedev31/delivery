import { Router } from "express";
import AuthCheck from "../middleware/authCheck";
import personalAreaController from "../controllers/personalAreaController";

const personalRouter = Router();

personalRouter.get(
  "/redirect",
  AuthCheck.checkTokenJwt,
  personalAreaController.redirectNavigation.bind(personalAreaController)
);

personalRouter.get(
  "/info",
  AuthCheck.checkTokenJwt,
  personalAreaController.read.bind(personalAreaController)
);

export default personalRouter;
