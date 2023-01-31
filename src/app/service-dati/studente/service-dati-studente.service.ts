import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Studente } from 'src/app/classi/Studente';
import { RicevitoreStudenteService } from 'src/app/service-invio-dati/studente/ricevitore-studente.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiStudenteService {
  messageLogin: string;
  checkUser: string;
  private studente: Studente;

  constructor(private router: Router, private ricevitoreStudente: RicevitoreStudenteService) { }

  loginStudente(studente: {userCode: string, pas: string}): void{
    this.ricevitoreStudente.login(studente).subscribe({
      next: (studente_loggato: Studente) => {
        this.studente = studente_loggato;
        this.checkUser = 'true';
        this.messageLogin = 'Reindirizzamento alla home';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = 'false'
        this.messageLogin = error.error;
      }
    });
  }

  resetPassword(studente: {mail: string, userCode: string}): void{
    this.ricevitoreStudente.resetPassword(studente)
  }

  getStudente(): Studente{
    return this.studente;
  }
}
