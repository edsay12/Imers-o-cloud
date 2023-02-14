import upload from "../middleware/upload";

import { Request, Response, Router } from "express";
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
  ControleS3.updateStorageClassForItemTrash(req, res);
});

routes.get("/:bucketName", async (req: Request, res: Response) => {
  ControleS3.getBucketItens(req, res);
});

routes.get("/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.getBucketItem(req, res);
});

routes.get(
  "/url/:bucketName/:fileName",
  async (req: Request, res: Response) => {
    ControleS3.getItemUrl(req, res);
  }
  
);

routes.put("/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.updateStorageClassForItem(req, res);
});


routes.get("/restore/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.restoreItem(req, res);
});

routes.get("/trash/:bucketName/:fileName", async (req: Request, res: Response) => {
  ControleS3.updateStorageClassForItemTrash(req, res);
});


export default routes;
