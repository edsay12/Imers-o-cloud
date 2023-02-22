import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

class UserController {
  constructor() {}

  signUp(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ erros: result.array() });
    }
    res.status(200).send("okay");

    
  }
  signIn(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ erros: result.array() });
    }
    res.status(200).send("okay");


    
  }
  verify(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ erros: result.array() });
    }
    res.status(200).send("okay");



  }
}

export default new UserController();
