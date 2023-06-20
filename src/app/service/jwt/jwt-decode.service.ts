import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'src/app/class/jwtDecode';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

  public getTokenDecode(token: string): jwtDecode{
    try{
      return jwt_decode(token);
    }catch(error){
      console.log(error);
      return null;
    }
  }
}
