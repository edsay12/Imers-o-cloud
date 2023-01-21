import express, { Express } from "express";
import * as dotenv from "dotenv";
import upload from "./middleware/upload";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", upload.single("userItem"), (req, res) => {
  console.log(req.file?.filename);
  res.sendStatus(200);
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at port ${process.env.NODE_PORT} `);
});

export default app;
