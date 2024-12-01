import { Router } from "express";
import personalAreaController from "../controllers/personalAreaController";
import AuthCheck from "../middleware/authCheck";
import upload from "../middleware/multer";

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

personalRouter.patch("/avatar", AuthCheck.checkTokenJwt, upload.single('image'), 
                    personalAreaController.updateAvatar.bind(personalAreaController));

export default personalRouter;
