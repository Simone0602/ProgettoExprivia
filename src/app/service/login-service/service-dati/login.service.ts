import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from 'src/app/class/Docente';
import { Response } from 'src/app/class/Response';
import { Studente } from 'src/app/class/Studente';
import { RicevitoreLoginService } from '../ricevitore-dati/ricevitore-login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  message: string;
  checkUser: string;

  constructor(private router: Router,
    private ricevitore: RicevitoreLoginService) { }

  loginDocente(docente: {mail: string, codiceFiscale: string, password: string}): Promise<Response>{
    let promise = new Promise<Response>((res) => {
      this.ricevitore.loginDocente(docente).subscribe({
        next: (token_docente: Response) => {
          token_docente.token = "Bearer " + token_docente.token;
          res(token_docente);
          this.checkUser = 'true';
          this.message = 'Reindirizzamento al registro elettronico';
          this.router.navigate(['/docente', 'registro-docente']);
        }, 
        error: (error: HttpErrorResponse) => {
          this.checkUser = 'false'
          this.message = error.error.message;
        }
      });
    })
    return promise;
  }

  loginStudente(studente: {userCode: string, password: string}): Promise<Response>{
    let promise = new Promise<Response>((res) => {
      this.ricevitore.loginStudente(studente).subscribe({
        next: (token_studente: Response) => {
          token_studente.token = "Bearer " + token_studente.token;
          res(token_studente);
          this.checkUser = 'true';
          this.message = 'Reindirizzamento al registro elettronico';
          this.router.navigate(['/studente', 'registro-famiglie']);
        },
        error: (error: HttpErrorResponse) => {
          this.checkUser = 'false'
          this.message = error.error.message;
        }
      });
    })
    return promise;
  }

  sendEmailStudente(studente: {mail: string, userCode: string}): void{
    this.ricevitore.sendEmailStudente(studente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = "true";
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = "false"
        this.message = error.error.message;
      }
    })
  }

  sendEmailDocente(docente: {mail: string, codiceFiscale: string}): void{
    this.ricevitore.sendEmailDocente(docente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = "true";
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = "false"
        this.message = error.error.message;
      }
    })
  }

  sendMessageStudente(studente: {number: string, userCode: string}): void{
    this.ricevitore.sendMessageStudente(studente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = "true";
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = "false"
        this.message = error.error.message;
      }
    });
  }

  sendMessageDocente(docente: {number: string, codiceFiscale: string}): void{
    this.ricevitore.sendMessageDocente(docente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = "true";
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = "false"
        this.message = error.error.message;
      }
    });
  }

  updatePassword(password: string, token: string, tipoUser: string): void{
    this.ricevitore.updatePassword(password, token, tipoUser).subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = 'false';
        this.message = error.error.message;
      }
    });
  }

  getStudente(userCode: string, token: string): Promise<Studente>{
    let promise = new Promise<Studente>((res, rej) => {
      this.ricevitore.getStudente(userCode, token).subscribe({
        next: (studente: Studente) => {
          res(studente);
        },
        error: (error: HttpErrorResponse) => {
          rej(error.error);
        }
      });
    })
    return promise;
  }

  getDocente(codiceFiscale: string, token: string): Promise<Docente>{
    let promise = new Promise<Docente>((res, rej) => {
      this.ricevitore.getDocente(codiceFiscale, token).subscribe({
        next: (docente: Docente) => {
          res(docente);
        },
        error: (error: HttpErrorResponse) => {
          rej(error.error);
        }
      });
    })
    return promise;
  }
}
