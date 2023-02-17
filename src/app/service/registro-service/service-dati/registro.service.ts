import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Classe } from 'src/app/class/Classe';
import { RegistroStudente } from 'src/app/class/RegistroStudente';
import { Studente } from 'src/app/class/Studente';
import { LoginService } from '../../login-service/service-dati/login.service';
import { RicevitoreRegistroService } from '../ricevitore-dati/ricevitore-registro.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private _registro: RegistroStudente;
  private classi: Classe[] = [];
  private studenti: Studente[] = [];

  constructor(private router: Router, private ricevitoreRegistro: RicevitoreRegistroService, 
    private loginService: LoginService) { }

  registro(): void{
    this.ricevitoreRegistro.getRegistro(this.loginService.getStudente().mail).subscribe(({
      next: (_registro: RegistroStudente) => {
        this._registro = _registro;
      },
      error: (error: HttpErrorResponse) => {
        alert(`Qualcosa è andato storto\n${error.error}`)
      }
    })) 
  }

  getListaClassi(codiceFiscale: string): void{
    this.ricevitoreRegistro.getListaClassi(codiceFiscale).subscribe({
      next: (classi: Classe[]) => {
        this.classi = classi;
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }

  getStudentiBySezione(sezione: string): void{
    this.ricevitoreRegistro.getStudentiBySezione(sezione).subscribe({
      next: (studenti: Studente[]) => {
        this.studenti = studenti;
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    });
  }

  getRegistro(): RegistroStudente{
    return this._registro;
  }

  getClassi(): Classe[]{
    return this.classi;
  }

  getStudenti(): Studente[]{
    return this.studenti
  }

  setStudenti(studenti: Studente[]): void{
    this.studenti = studenti;
  }
}
