import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import AWS from "aws-sdk";
import crypto from "crypto";
import ControleS3 from "./ControleS3";

class UserController {
  private cognitoIdentity: AWS.CognitoIdentityServiceProvider;
  private secreteHash: string =
    "19vt4r201gd52t510c5i9c6n4b24q54vebjkgo6svkuuil7e4tm9";
  private clientId: string = "3gh86dkjdccdd7sq9ut10b0mbe";
  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
      region: "us-east-1",
    });
  }

  async signUp(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ erros: result.array() });
    }

    const {  email, password, bucket } =
      req.body;
    let userAtt = [];
    userAtt.push({ Name: "email", Value: email });
    
    const bucketCreatedName = await ControleS3.createBucket(email)
    
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
          res.send(data.message);
        }
      }
    );
  }

  signIn(req: Request, res: Response) {
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
          'USERNAME': email,
          'PASSWORD': password,
          'SECRET_HASH': generateHash,
        },
      },
      (data, err) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
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
          res.send("success");
        }
      }
    );
  }
}

export default new UserController();
