import upload from "../middleware/upload";

import { Request, Response, Router } from "express";
import ControleS3 from "../controller/ControleS3";
("express");
import { CognitoJwtVerifier } from "aws-jwt-verify";
import jwt, { decode } from "jsonwebtoken";
import authorization from "../middleware/authorization";
import { ok } from "assert";
const s3Router = Router();

s3Router.post(
  "/:bucketName",
  upload.single("arquivo"),
  (req: Request, res: Response) => {
    ControleS3.saveFile(req, res);
  }
);

// s3Router.post("/bucket/:bucketName", (req: Request, res: Response) => {
//   ControleS3.createBucket(req, res);
// });

s3Router.put(
  "/updateForGlacierIR/:bucketName/:fileName",
  authorization,
  async (req: Request, res: Response) => {
    ControleS3.updateStorageClassForItemTrash(req, res);
  }
);

s3Router.delete("/:bucketName/:fileName", authorization, (req, res) => {
  ControleS3.deleteFile(req, res);
});

s3Router.get("/sizes/:bucketName", authorization, (req, res) => {
  ControleS3.getStorageSize(req, res);
});
s3Router.put(
  "/updateForGlacier/:bucketName/:fileName",
  authorization,
  async (req: Request, res: Response) => {
    ControleS3.updateStorageClassForItem(req, res);
  }
);

s3Router.get(
  "/:bucketName",
  authorization,
  async (req: Request, res: Response) => {
    ControleS3.getBucketItens(req, res);
  }
);

s3Router.get("/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.getBucketItem(req, res);
});

s3Router.get(
  "/url/:bucketName/:fileName",
  authorization,
  async (req: Request, res: Response) => {
    ControleS3.getItemUrl(req, res);
  }
);

s3Router.get(
  "/restore/:bucketName/:fileName",
  authorization,
  async (req: Request, res: Response) => {
    ControleS3.restoreItem(req, res);
  }
);

s3Router.put(
  "/trash/restore/:bucketName/:fileName",
  authorization,
  (req, res) => {
    ControleS3.restoreTrashItem(req, res);
  }
);

s3Router.get(
  "/trash/:bucketName/:fileName",
  authorization,
  async (req: Request, res: Response) => {
    ControleS3.updateStorageClassForItemTrash(req, res);
  }
);

s3Router.get("/glacier/status/:bucketName/", authorization, (req, res) => {
  ControleS3.bucketStatus(req, res);
});
s3Router.get("/verifyToken", authorization, (req, res) => {
  return res.sendStatus(200);
});

export default s3Router;
