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
  "/:bucketName",
  upload.single("arquivo"),

  async (req: Request, res: Response) => {
    const { bucketName } = req.params;
    const filename = req.file?.filename ? req.file?.filename : "";
    const data = ControleS3.saveFile(filename, bucketName);
    res.send({
      message: "Item adicionado com sucesso",
    });
  }
);

routes.post("/bucket/:bucktName", (req: Request, res: Response) => {
  const { bucktName } = req.params;
  ControleS3.createBucket(bucktName, res);
});

routes.delete("/:bucketName/:fileName", async (req: Request, res: Response) => {
  const { bucketName, fileName } = req.params;
  console.log(bucketName,fileName)
  ControleS3.deleteFile(fileName,bucketName);

  return res.status(202).send('success')
});

export default routes;

