import { Request, Response } from "express";
import aws, { S3 } from 'aws-sdk';
import mime from "mime";
import upload from "../middleware/upload";
import path from "path";
import FileSystem from "fs";

class ControlerS3 {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    });
  }
  async saveFile(filename: string): Promise<void>{
    const originalPath = path.resolve(__dirname, "../../public/upload");

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      //console.log("Arquivo não encontrado")
      throw new Error("file not found");
    }

    const fileContent = await FileSystem.promises.readFile(originalPath)

    this.client.putObject({
      Bucket: 'files-users',
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    })
      .promise();
    await FileSystem.promises.unlink(originalPath)
    
  }
  
  async deleteFile(filename: string): Promise<void>{
    await this.client.deleteObject({
      Bucket: 'filers users',
      Key: filename,
    })
      .promise();
  }
}

export default ControlerS3;
