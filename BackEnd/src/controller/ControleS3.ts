import { Request, Response } from "express";
import aws, { S3 } from "aws-sdk";
import mime from "mime";
import upload from "../middleware/upload";
import path from "path";
import FileSystem from "fs";
import crypto from "crypto";

class ControlerS3 {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1", // Lembrar de sempre mudar a região
    });
  }

  createBucket(bucketName: string, res: Response) {
    const bucket = `${bucketName}-${crypto.randomBytes(10).toString("hex")}`;
    this.client.createBucket(
      {
        Bucket: bucket,
      },
      function (err, data) {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.status(200).json(data.Location);
        }
      }
    );
  }


  async saveFile(filename: string, bucketName: string): Promise<void> {
    const originalPath = path.resolve(
      __dirname,
      "../../public/upload",
      filename
    );

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      //console.log("Arquivo não encontrado")
      throw new Error("file not found");
    }

    const fileContent = await FileSystem.promises.readFile(originalPath);
    this.client
      .putObject({
        Bucket: bucketName,
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();
    await FileSystem.promises.unlink(originalPath);
  }

  async deleteFile(filename: string,bucketName:string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket:bucketName,
        Key:filename,
      })
      .promise();


  }
}

export default new ControlerS3();
