import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

  public getTokenDecode(token: string): {sub: string, exp: Date, iat: Date}{
    try{
      const jwt_token: {sub: string, exp: Date, iat: Date} = jwt_decode(token)
      return jwt_token;
    }catch(Error){
      return null;
    }
  }
}
