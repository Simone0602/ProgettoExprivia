import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroStudente } from 'src/app/class/RegistroStudente';
import { Studente } from 'src/app/class/Studente';
import { RicevitoreStudenteService } from '../ricevitore-dati/ricevitore-studente.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiStudenteService {
  message: string;
  checkUser: string;
  newToken: string;

  private _studente: Studente;
  private _registro: RegistroStudente;

  constructor(private router: Router, private ricevitoreStudente: RicevitoreStudenteService) { }

  loginStudente(studente: {userCode: string, password: string}): void{
    this.ricevitoreStudente.login(studente).subscribe({
      next: (_studente_loggato: Studente) => {
        this._studente = _studente_loggato;
        this.checkUser = 'true';
        this.message = 'Reindirizzamento alla home';
        setTimeout(() => {
          this.router.navigate(['/registro', 'studente', 'registro-famiglie']).then(() => {
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
    this.ricevitoreStudente.sendEmail(studente, tipoUtente).subscribe({
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
    this.ricevitoreStudente.updatePassword(password, token).subscribe({
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
    this.ricevitoreStudente.getToken(userCode).subscribe({
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

  registro(): void{
    this.ricevitoreStudente.getRegistro(this._studente.mail).subscribe(({
      next: (_registro: RegistroStudente) => {
        this._registro = _registro;
      },
      error: (error: HttpErrorResponse) => {
        alert(`Qualcosa è andato storto\n${error.error}`)
      }
    }))
  }

  getStudente(): Studente{
    return this._studente;
  }

  getRegistro(): RegistroStudente{
    return this._registro;
  }
}
