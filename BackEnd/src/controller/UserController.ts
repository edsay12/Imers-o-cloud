import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import AWS from "aws-sdk";
import crypto from "crypto";
import ControleS3 from "./ControleS3";
import * as dotenv from "dotenv";
dotenv.config();

class UserController {
  private cognitoIdentity: AWS.CognitoIdentityServiceProvider;
  private secreteHash: any = process.env.COGNITO_SECRET;

  private clientId: any = process.env.COGNITO_CID;
  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
      region: "us-east-1",
    });
    console.log(process.env.COGNITO_SECRET);
    console.log(process.env.COGNITO_CID);
  }

  async signUp(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ erros: result.array() });
    }

    const { email, password, bucket } = req.body;
    let userAtt = [];
    userAtt.push({ Name: "email", Value: email });

    const bucketCreatedName = await ControleS3.createBucket(email);

    userAtt.push({ Name: "custom:bucket_name", Value: bucketCreatedName });
    // Aqui e gerado um hash
    const generateHash = crypto
      .createHmac("SHA256", this.secreteHash)
      .update(email + this.clientId)
      .digest("base64");

    // cognito

    this.cognitoIdentity.signUp(
      {
        ClientId: this.clientId,
        SecretHash: generateHash,
        Password: password,
        Username: email,
        UserAttributes: userAtt,
      },
      (data, err) => {
        if (err) {
          res.send(err);
        } else {
          if (typeof data.statusCode != 'undefined') {
            console.log(data.statusCode)
            res.status(data.statusCode).send(data);
          }else{
            res.send(data.message).status(200);

          }
        }
      }
    );
  }

  signIn(req: Request, res: Response) {
    console.log(req.body)
    const { email, password } = req.body;
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ erros: result.array() });
    }
    const generateHash = crypto
      .createHmac("SHA256", this.secreteHash)
      .update(email + this.clientId)
      .digest("base64");

    this.cognitoIdentity.initiateAuth(
      {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: generateHash,
        },
      },
      (data, err) => {
        if (err) {
          res.send(err);
        } else {
          if (typeof data.statusCode != 'undefined') {
            console.log(data.statusCode)
            res.status(data.statusCode).send(data);
          }else{
            res.send(data.message).status(200);

          }
        }
      }
    );
  }

  verifyAccout(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ erros: result.array() });
    }
    const { email, code } = req.body;
    const generateHash = crypto
      .createHmac("SHA256", this.secreteHash)
      .update(email + this.clientId)
      .digest("base64");

    this.cognitoIdentity.confirmSignUp(
      {
        ClientId: this.clientId,
        ConfirmationCode: code,
        SecretHash: generateHash,
        Username: email,
      },
      (data, err) => {
        if (err) {
          res.send(err);
        } else {
          if (typeof data.statusCode != 'undefined') {
            console.log(data.statusCode)
            res.status(data.statusCode).send(data);
          }else{
            res.send(data.message).status(200);

          }
        }
      }
    );
  }

  forgotPassword(req: Request, res: Response) {
    const result = validationResult(req);
    const { email } = req.body;
    if (!result.isEmpty()) {
      return res.status(422).json({ erros: result.array() });
    }
    const generateHash = crypto
      .createHmac("SHA256", this.secreteHash)
      .update(email + this.clientId)
      .digest("base64");

    this.cognitoIdentity.forgotPassword(
      {
        ClientId: this.clientId,
        SecretHash: generateHash,
        Username: email,
      },
      (data, err) => {
        if (err) {
          res.send(err);
        } else {
          if (typeof data.statusCode != 'undefined') {
            console.log(data.statusCode)
            res.status(data.statusCode).send(data);
          }else{
            res.send(data.message).status(200);

          }
        }
      }
    );
  }

  verifyNewPassword(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ erros: result.array() });
    }
    const { email, code, newPassword } = req.body;
    const generateHash = crypto
      .createHmac("SHA256", this.secreteHash)
      .update(email + this.clientId)
      .digest("base64");

    this.cognitoIdentity.confirmForgotPassword(
      {
        ClientId: this.clientId,
        Username: email,
        SecretHash: generateHash,
        Password: newPassword,
        ConfirmationCode: code,
      },
      (data, err) => {
        if (err) {
          res.send(err);
        } else {
          if (typeof data.statusCode != 'undefined') {
            console.log(data.statusCode)
            res.status(data.statusCode).send(data);
          }else{
            res.send(data.message).status(200);

          }
        }
      }
    );
  }
}

export default new UserController();
