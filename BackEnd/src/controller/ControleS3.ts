import { Request, Response } from "express";
class ControlerS3 {
  // Create a item in s3
  create(req: Request, res: Response) {
    console.log(req.file?.filename);
    res.sendStatus(200);
  }

  update() {}
}

export default new ControlerS3();
