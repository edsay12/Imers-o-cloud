import {} from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

function getBucketName(req: Request) {
  const idToken = req.header("idToken") ? req.header("idToken") : "";
  if (!idToken) return;

  var decoded = jwt.decode(idToken, { complete: true });
  if (!decoded?.payload) return;
  const payload: any = decoded?.payload;
  const bucketName = payload["custom:bucket_name"].replace("/", "");
  return { bucketName };
}
