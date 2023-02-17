import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from 'src/app/class/Docente';
import { Studente } from 'src/app/class/Studente';
import { RicevitoreLoginService } from '../ricevitore-dati/ricevitore-login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  message: string;
  checkUser: string;
  newToken: string;

  private _studente: Studente;
  private _docente: Docente;

  constructor(private router: Router,
    private ricevitore: RicevitoreLoginService) { }

  loginDocente(docente: {mail: string, codiceFiscale: string, password: string}): void{
    this.ricevitore.loginDocente(docente).subscribe({
      next: (docente: Docente) => {
        this._docente = docente;
        this.checkUser = 'true';
        this.message = 'Reindirizzamento al registro elettronico';
        setTimeout(() => {
          this.router.navigate(['/docente', 'registro-docente']).then(() => {
            sessionStorage.setItem('user', JSON.stringify(this._docente));
          });
        }, 1500);
      }, 
      error: (error: HttpErrorResponse) => {
        this.checkUser = 'false'
        this.message = error.error;
      }
    });
  }

  loginStudente(studente: {userCode: string, password: string}): void{
    this.ricevitore.loginStudente(studente).subscribe({
      next: (_studente_loggato: Studente) => {
        this._studente = _studente_loggato;
        this.checkUser = 'true';
        this.message = 'Reindirizzamento al registro elettronico';
        setTimeout(() => {
          this.router.navigate(['/studente', 'registro-famiglie']).then(() => {
            sessionStorage.setItem('user', JSON.stringify(this._studente));
          });
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = 'false'
        this.message = error.error;
      }
    });
  }

  sendEmail(studente: {mail: string, userCode: string}, tipoUtente: string): void{
    this.ricevitore.sendEmail(studente, tipoUtente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = "true";
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = "false"
        this.message = error.error;
      }
    })
  }

  updatePassword(password: string, token: string): void{
    this.ricevitore.updatePassword(password, token).subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error;
        this.checkUser = 'false';
      }
    });
  }

  getToken(userCode: string): void{
    this.ricevitore.getToken(userCode).subscribe({
      next: (token: string) => {
        this.message = 'Token trovato! Reindirizzamento al cambio password';
        this.checkUser = 'true';
        this.newToken = token;     
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error;
        this.checkUser = 'false';
        this.newToken = '';
      }
    });
  }

  getStudente(): Studente{
    return this._studente;
  }

  getDocente(): Docente{
    return this._docente;
  }
}
