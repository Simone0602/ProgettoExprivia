import { Injectable } from '@angular/core';
import { JwtDecodeService } from 'src/app/service/jwt-decode/jwt-decode.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtDecode: JwtDecodeService) { }

  public isAuthenicated(): boolean{
    const token = JSON.parse(localStorage.getItem('token'));
    if(!token){
      return false;
    }
    const token_decode = this.jwtDecode.getTokenDecode(token.token);

    const dateNow = new Date().getTime();
    const dateExp = new Date(token_decode.exp).getTime() * 1000;

    if(dateExp >= dateNow){
      return true;
    }
    return false;
  }

  public role(): boolean{
    const token = JSON.parse(localStorage.getItem('token'));

    if(token.utenza == 'studente'){
      return true;
    }
    return false;
  }
}

