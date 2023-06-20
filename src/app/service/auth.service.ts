import { Injectable } from '@angular/core';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtDecode: JwtDecodeService) { }

  public isAuthenticated(): boolean{
    const token = JSON.parse(localStorage.getItem('token'));
    if(!token){
      return false;
    }
    const token_decode = this.jwtDecode.getTokenDecode(token.token);

    const dateNow = new Date().getTime();
    const dateExp = new Date(token_decode.exp).getTime() * 1000;

    return dateExp >= dateNow;
  }

  public role(): boolean{
    const token = JSON.parse(localStorage.getItem('token'));

    return token.utenza == 'studente';
  }
}

