import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Assenza } from 'src/app/class/Assenza';
import { Classe } from 'src/app/class/Classe';
import { RegistroStudente } from 'src/app/class/RegistroStudente';
import { Studente } from 'src/app/class/Studente';
import { RicevitoreRegistroService } from '../ricevitore-dati/ricevitore-registro.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  loading: boolean = true;

  message: string;
  check: string = '';
  
  private registro: RegistroStudente;
  private assenze: Assenza[] = [];
  private classi: Classe[] = [];
  private studenti: Studente[] = [];

  constructor(private ricevitoreRegistro: RicevitoreRegistroService) { }

  async callGetRegistro(userCode: string): Promise<void>{
    let promise = new Promise<void>(() => {
      this.ricevitoreRegistro.getRegistro(userCode).subscribe(({
        next: (_registro: RegistroStudente) => {
          this.registro = _registro;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error)
        }
      }))
    })
    return promise;
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

  updateStudent(studente: FormGroup): void{
    this.ricevitoreRegistro.updateStudente(studente).subscribe({
      next: (message: string) => {
        this.message = message;
        this.check = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error + 'Si prega di cambiarla se si vuole eseguire una modifica';
        this.check = 'false';
      }
    });
  }

  async callGetAssenze(userCode: string): Promise<void>{
    let promise = new Promise<void>(() => {
      this.ricevitoreRegistro.getAssenze(userCode).subscribe({
        next: (_assenze: Assenza[]) => {
          this.assenze = _assenze;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      });
    });
    return promise;
  }

  giustificaAssenze(listaAssenze: Assenza[], userCode: string): void{
    this.ricevitoreRegistro.giustificaAssenze(listaAssenze, userCode).subscribe({
      next: (message: string) => {
        this.message = message;
        this.check = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error;
        this.check = 'false';
      }
    })
  }

  getRegistro(): RegistroStudente{
    return this.registro;
  }

  getAssenze(): Assenza[]{
    return this.assenze;
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
