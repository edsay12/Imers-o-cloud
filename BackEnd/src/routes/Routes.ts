import controlerS3 from "../controller/ControleS3";
import upload from "../middleware/upload";
import UploadArchives from "../middleware/UploadArchives";
import DeleteArchives from "../middleware/DeleteArchives";
import { Request, Response, response, Router } from "express";
import multer from "multer";
("express");

const routes = Router();

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

routes.delete(
    "/", async (req: Request, res: Response) => {
  const deleteArchives = new DeleteArchives();
  await deleteArchives.execute();

  return response.send();
});

export default routes;
