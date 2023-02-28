import upload from "../middleware/upload";

import { Request, Response, Router } from "express";
import UserController from "../controller/UserController";
import userBodyValidator from "../utils/userBodyValidator";
import { body } from "express-validator";
import jwt from 'jsonwebtoken'
("express");

const userRouter = Router();

userRouter.post(
  "/signUp",
  userBodyValidator("signUp"),
  (req: Request, res: Response) => {
    UserController.signUp(req, res);
  }
);
userRouter.post(
  "/signIn",
  userBodyValidator("signIn"),
  (req: Request, res: Response) => {
    UserController.signIn(req, res);
  }
);
userRouter.post(
  "/verify",
  userBodyValidator("verify"),
  (req: Request, res: Response) => {
    UserController.verifyAccout(req, res);
  }
);

userRouter.post(
  "/forgotPassword",
  body("email").isEmail().notEmpty(),
  (req: Request, res: Response) => {
    UserController.forgotPassword(req, res);
  }
);

userRouter.post(
  "/newPassword",
  body("email").isEmail().notEmpty(),
  body('code').notEmpty(),
  body("newPassword").matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .withMessage('A senha deve conter pelo menos 1 número, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula, com no mínimo 8 caracteres.'),
  (req: Request, res: Response) => {
    UserController.verifyNewPassword(req, res);
  }
);

userRouter.get('/getS3BucketName',(req: Request, res: Response)=>{
  const idToken = req.header("idToken") ? req.header("idToken") : "";
  if (!idToken) return res.status(500);

  var decoded = jwt.decode(idToken, { complete: true });
  if (!decoded?.payload) return;
  const payload: any = decoded?.payload;
  const bucketName = payload["custom:bucket_name"].replace("/", "");
  res.json({bucketName})

  
})
export default userRouter;
