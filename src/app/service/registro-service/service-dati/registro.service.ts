import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Classe } from 'src/app/class/Classe';
import { Docente } from 'src/app/class/Docente';
import { RegistroStudente } from 'src/app/class/RegistroStudente';
import { Studente } from 'src/app/class/Studente';
import { LoginService } from '../../login-service/service-dati/login.service';
import { RicevitoreRegistroService } from '../ricevitore-dati/ricevitore-registro.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  message: string;
  check: string = '';
  private _registro: RegistroStudente;
  private classi: Classe[] = [];
  private studenti: Studente[] = [];

  constructor(private ricevitoreRegistro: RicevitoreRegistroService, 
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

  updateDocente(docente: FormGroup): void{
    this.ricevitoreRegistro.updateDocente(docente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.check = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error;
        this.check = 'false';
      }
    });
  }

  updateStudent(studente: FormGroup){
    this.ricevitoreRegistro.updateStudente(studente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.check = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error;
        this.check = 'false';
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
