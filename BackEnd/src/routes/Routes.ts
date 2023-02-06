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
  (req: Request, res: Response) => {
    ControleS3.saveFile(req, res);
  }
);

routes.post("/bucket/:bucketName", (req: Request, res: Response) => {
  ControleS3.createBucket(req, res);
});

routes.delete("/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.deleteFile(req, res);
});
routes.get("/:bucketName", async (req: Request, res: Response) => {
  ControleS3.getBucketItens(req, res);
});

routes.get("/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.getBucketItem(req, res);
});

routes.get("/url/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.getBucketItem(req, res);
});

export default routes;
