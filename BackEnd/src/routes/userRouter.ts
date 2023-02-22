import upload from "../middleware/upload";

import { Request, Response, Router } from "express";
import UserController from "../controller/UserController";
import userBodyValidator from "../utils/userBodyValidator";
("express");

const userRouter = Router();

userRouter.post("/signUp",userBodyValidator("signUp"),(req: Request, res: Response) => {
    UserController.signUp(req, res);
  }
);
userRouter.post("/signIn",userBodyValidator("signIn"),(req: Request, res: Response) => {
    UserController.signIn(req, res);
  }
);
userRouter.post("/verify",userBodyValidator("verify"),(req: Request, res: Response) => {
    UserController.verify(req, res);
  }
);

export default userRouter;
