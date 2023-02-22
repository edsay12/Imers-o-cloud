import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import AWS from "aws-sdk";
import crypto from "crypto";

class UserController {
  private cognitoIdentity: AWS.CognitoIdentityServiceProvider;
  private secreteHash: string =
    "1d2vefnim9jn4fdaorsr25t5tunml796vfemdhketm4qpe40luf9";
  private clientId: string = "7fors8odjeeebha64s8qf7gg08";
  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
      region: "us-east-1",
    });
  }

  signUp(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ erros: result.array() });
    }

    const { nickname, email, password, given_name, phone_number, family_name } =
      req.body;
    let userAtt = [];
    userAtt.push({ Name: "email", Value: email });
    userAtt.push({ Name: "phone_number", Value: phone_number });
    userAtt.push({ Name: "given_name", Value: given_name });
    // userAtt.push({ Name: "family_name ", Value: family_name  });
    userAtt.push({ Name: "nickname", Value: nickname });

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
