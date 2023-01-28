import controlerS3 from "../controller/ControleS3";
import upload from "../middleware/upload";
import DeleteArchives from "../middleware/DeleteArchives";
import { Request, Response, response, Router } from "express";
import multer from "multer";
import AWS from "aws-sdk";
import ControleS3 from "../controller/ControleS3";
("express");

const routes = Router();

// nao mandar para o codigo

routes.post(
  "/",
  upload.single("image"),

    async (req: Request, res: Response) => {
    const { file } = req;
    const uploadArchives = new UploadArchives();
    await uploadArchives.execute(req.file);


    return res.send(req.file);
  }
);

routes.post("/bucket/:bucktName", (req, res) => {
  const { bucktName } = req.params;
  var okay = ControleS3.createBucket(bucktName);
  res.send(okay)
});

routes.delete("/", async (req: Request, res: Response) => {
  const deleteArchives = new DeleteArchives();
  await deleteArchives.execute();

  return response.send();
});

export default routes;
