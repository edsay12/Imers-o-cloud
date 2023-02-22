import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import AWS from "aws-sdk";
import crypto from "crypto";

class UserController {
  private cognitoIdentity: AWS.CognitoIdentityServiceProvider;
  private secreteHash: string ='1d2vefnim9jn4fdaorsr25t5tunml796vfemdhketm4qpe40luf9'
  private clientId: string ='7fors8odjeeebha64s8qf7gg08';
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

    const { nickname, email, password, given_name,phone_number, family_name } = req.body;
    let userAtt = [];
    userAtt.push({ Name: "email", Value: email });
    userAtt.push({ Name: "phone_number", Value: phone_number });
    userAtt.push({ Name: "given_name", Value:given_name});
    // userAtt.push({ Name: "family_name ", Value: family_name  });
    userAtt.push({ Name: "nickname", Value: nickname  });

    // Aqui e gerado um hash
    const generateHash = crypto
      .createHmac("SHA256", this.secreteHash)
      .update(email + this.clientId)
      .digest("base64");

    // cognito

    this.cognitoIdentity.signUp(
      {
        ClientId:this.clientId,
        SecretHash:generateHash,
        Password:password,
        Username: email,
        UserAttributes: userAtt,
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

  signIn(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ erros: result.array() });
    }
    res.status(200).send("okay");
  }
  verify(req: Request, res: Response) {
    //validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ erros: result.array() });
    }
    res.status(200).send("okay");
  }
}

export default new UserController();
