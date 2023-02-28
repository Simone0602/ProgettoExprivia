import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'src/app/class/jwtDecode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

  public getTokenDecode(token: string): jwtDecode{
    try{
      return jwt_decode(token);
    }catch(Error){
      return null;
    }
  }
}
