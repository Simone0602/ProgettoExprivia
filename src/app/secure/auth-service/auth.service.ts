import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenicated(): boolean{
    const token = localStorage.getItem('token');
    return true;
  }
}
