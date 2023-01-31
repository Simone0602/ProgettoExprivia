import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Studente } from 'src/app/classi/Studente';
import { RicevitoreStudenteService } from 'src/app/service-invio-dati/studente/ricevitore-studente.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiStudenteService {
  message: string;
  checkUser: string;
  private studente: Studente;

  constructor(private router: Router, private ricevitoreStudente: RicevitoreStudenteService) { }

  loginStudente(studente: {userCode: string, pas: string}): void{
    this.ricevitoreStudente.login(studente).subscribe({
      next: (studente_loggato: Studente) => {
        this.studente = studente_loggato;
        this.checkUser = 'true';
        this.message = 'Reindirizzamento alla home';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = 'false'
        this.message = error.error;
      }
    });
  }

  resetPassword(studente: {mail: string, userCode: string}): void{
    this.ricevitoreStudente.resetPassword(studente).subscribe({
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

  getStudente(): Studente{
    return this.studente;
  }
}
