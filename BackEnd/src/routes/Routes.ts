import controlerS3 from "../controller/ControleS3";
import upload from "../middleware/upload";

import { Router } from "express";
("express");

const routes = Router();

routes.post("/", upload.single("userItem"), controlerS3.create);


export default routes;
