import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import fetch from "node-fetch";

type authTypes = {
  token: string;
};
import { Request, Response } from "express";
var pems: { [key: string]: any } = {};

const region = "us-east-1";
const userGroupId = "us-east-1_4VuOZ4VUs";

async function Authorization(req: Request, res: Response, next: NextFunction) {
  await setUp().then(()=>{
    const token  = req.header('Authorization');
   
    if (!token) return res.status(401).end();

    let decodedJwt: any = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      res.status(401).end()
      return
    }
    
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
  
    if (!pem) {
      res.status(401).end()
    
      return
    }
    jwt.verify(token, pem, function (err: any, payload: any) {
      if (err) {
        res.status(401).end()
        return
      } else {
        next()
      }
    })
  })
  
  
}

async function setUp() {
  const URL = `https://cognito-idp.${region}.amazonaws.com/${userGroupId}/.well-known/jwks.json`;

  try {
    const response = await fetch(URL);
    if (response.status !== 200) {
      throw "request not successful";
    }
    const data: any = await response.json();
    const { keys } = data;
    for (let i = 0; i < keys.length; i++) {
      const key_id = keys[i].kid;
      const modulus = keys[i].n;
      const exponent = keys[i].e;
      const key_type = keys[i].kty;
      const jwk = { kty: key_type, n: modulus, e: exponent };
      const pem = jwkToPem(jwk);
      pems[key_id] = pem;
      
    }
    
    return;
  } catch (error) {
   
    
  }
}

export default Authorization;
