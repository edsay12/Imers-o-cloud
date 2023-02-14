import { Request, Response } from "express";
import aws, { S3 } from "aws-sdk";
import mime from "mime";
import upload from "../middleware/upload";
import path from "path";
import FileSystem from "fs";
import crypto from "crypto";

type awsResponse = {
  type: string;
  itens: {
    IsTruncated: boolean;
    Marker: string;
    Contents: [
      {
        Key: string;
        LastModified: Date;
        ETag: string;
        ChecksumAlgorithm: [];
        Size: number;
        StorageClass: "STANDARD" | "GLACIER" | "GLACIER_IR"; // na api so vai ser utilizado esses 3
        Owner: {
          DisplayName: string;
          ID: string;
        };
      }
    ];
  };
};
type apiContent = {
  Content: [
    {
      key?: string;
      itemName?: string;
      storageClass?: string;
      type?: string;
      size?: any;
      LastModified?: string | number;
    }
  ];
};

class ControlerS3 {
  private client: S3;

  // calcula tamanho

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1", // Lembrar de sempre mudar a região
    });
  }

  // Cria um bucket
  createBucket(req: Request, res: Response) {
    const { bucketName } = req.params;
    const bucket = `${bucketName}-${crypto.randomBytes(10).toString("hex")}`;
    this.client.createBucket(
      {
        Bucket: bucket,
      },
      function (err, data) {
        if (err) {
          return res.status(400).json({ type: "Error", message: err });
        } else {
          return res.status(200).json({
            type: "success",
            message: "item deletado com sucesso",
            bucketName: data.Location,
          });
        }
      }
    );
  }
  // Adiciona um Item ao bucket
  async saveFile(req: Request, res: Response): Promise<void> {
    const { bucketName } = req.params;
    const filename = req.file?.filename ? req.file?.filename : "";
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
    this.client.upload(
      {
        Bucket: bucketName,
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      },
      function (err, data) {
        if (err) {
          return res.status(400).json({ type: "Error", message: err });
        } else {
          return res.status(200).json({
            type: "success",
            message: "item adicionado com sucesso",
            item: data,
          });
        }
      }
    );
    await FileSystem.promises.unlink(originalPath);
  }
  // Deleta um OBjeto do bucket
  async deleteFile(req: Request, res: Response) {
    const { bucketName, fileName } = req.params;

    if (!bucketName) {
      return res.status(400).json({
        type: "Error",
        message: "nome do bucker incorreto ou inexistente",
      });
    }
    if (!fileName) {
      return res.status(400).json({
        type: "Error",
        message: "nome do arquivo errado ou inexistente",
      });
    }

    await this.client.deleteObject(
      {
        Bucket: bucketName,
        Key: fileName,
      },
      function (err, data) {
        if (err) {
          console.log(err)
          return res.status(400).json({ type: "Error", message: err });
        } else {
          return res
            .status(202)
            .json({ type: "success", message: "item deletado com sucesso" });
        }
      }
    );
  }
  // Mostrar todos os itens do Bucket
  async getBucketItens(req: Request, res: Response) {
    const { bucketName } = req.params;
    this.client.listObjects(
      {
        Bucket: bucketName,
      },
      function (err, data) {
        if (err) {
          res.send({ type: "Error", message: err });
        } else {
          if (!data.Contents) return res.send({ type: "success", itens: data });
          var response: apiContent = { Content: [{}] };
          response.Content.pop();
          function convertBytes(bytes: any) {
            const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            if (bytes === 0) return "0 Bytes";
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return (
              parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) +
              " " +
              sizes[i]
            );
          }

          for (var item of data.Contents) {
            let itemName = item.Key?.split("-")[1];
            let itemLastModified = item.LastModified?.toDateString();
            let itemSize = convertBytes(item.Size);
            let itemType = item.Key?.split(".")[1];

            response.Content.push({
              key: item.Key,
              type: itemType,
              itemName: itemName,
              LastModified: itemLastModified,
              size: itemSize,
              storageClass: item.StorageClass,
            });
          }
          res.send({ type: "success", itens: response });
        }
      }
    );
  }
  // Baixa o Item
  async getBucketItem(req: Request, res: Response) {
    const { fileName, bucketName } = req.params;
    this.client.getObject(
      {
        Bucket: bucketName,
        Key: fileName,
      },
      function (err, data) {
        if (err) {
          res.status(400).send({ type: "Error", message: err });
        } else {
          res.setHeader(
            "Content-Disposition",
            `attachment;filename= ${fileName}`
          );

          res.setHeader(
            "Content-Type",
            data.ContentType ? data.ContentType : ""
          );
          
          res.status(200).send({ type: "Success", body: data.Body });
          res.end();
        }
      }
    );
  }
  // Visualizar item
  async getItemUrl(req: Request, res: Response) {
    const { fileName, bucketName } = req.params;

    if (!bucketName) {
      return res.status(400).json({
        type: "Error",
        message: "nome do bucker incorreto ou inexistente",
      });
    }
    if (!fileName) {
      return res.status(400).json({
        type: "Error",
        message: "nome do arquivo errado ou inexistente",
      });
    }

    await this.client.getSignedUrl(
      "getObject",
      { Bucket: bucketName, Key: fileName },
      function (err, url) {
        if (err) {
          res.send({ type: "Error", message: err });
        } else {
          res.send({ type: "success", url });
        }
      }
    );
  }
  // Muda o tipo de armazenamento do arquivo de STANDART para GLACIER
  updateStorageClassForItem(req: Request, res: Response) {
    const { fileName, bucketName } = req.params;
    this.client.copyObject(
      {
        Bucket: bucketName,
        Key: fileName,
        CopySource: `${bucketName}/${fileName}`,
        StorageClass: "GLACIER",
      },
      function (err, url) {
        if (err) {
          res.send({ type: "Error", message: err }).status(500);
        } else {
          res.send({ type: "success", url });
        }
      }
    );
  }
  // // Muda o tipo de armazenamento do arquivo de STANDART para GLACIER IR
  updateStorageClassForItemTrash(req: Request, res: Response) {
    const { fileName, bucketName } = req.params;
    this.client.copyObject(
      {
        Bucket: bucketName,
        Key: fileName,
        CopySource: `${bucketName}/${fileName}`,
        StorageClass: "GLACIER_IR",
      },
      function (err, url) {
        if (err) {
          console.log(err)
          res.send({ type: "Error", message: err }).status(500);
        } else {
          res.send({ type: "success", url });
        }
      }
    );
  }
  // Faz a restauração do objeto que estava no aramazenado no GLACIER.
  restoreItem(req: Request, res: Response) {
    const { fileName, bucketName } = req.params;
    this.client.restoreObject(
      {
        Bucket: bucketName,
        Key: fileName,
        RestoreRequest: { Days: 1, GlacierJobParameters: { Tier: "Standard" } },
      },
      function (err, data) {
        if (err) {
          res.send({ type: "Error", message: err });
        } else {
          console.log("ueppa");
          res.send({ type: "success", message: "Restauração em andamento" });
        }
      }
    );
  }
}

export default new ControlerS3();
