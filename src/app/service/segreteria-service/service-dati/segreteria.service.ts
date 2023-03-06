import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Docente } from 'src/app/class/Docente';
import { Materia } from 'src/app/class/Materia';
import { Studente } from 'src/app/class/Studente';
import { RicevitoreSegreteriaService } from '../ricevitore-dati/ricevitore-segreteria.service';

@Injectable({
  providedIn: 'root'
})
export class SegreteriaService {
  check: string;
  message: string;
  user: string;

  private docente: Docente;
  private studente: Studente;

  private studenti: Studente[] = [];
  private docenti: Docente[] = [];
  private materie: Materia[] = [];

  constructor(private ricevitoreSegreteria: RicevitoreSegreteriaService) { }

  async findAllMaterie(): Promise<void>{
    let promise = new Promise<void>(() => {
      this.ricevitoreSegreteria.findAllMaterie().subscribe({
        next: (materie: Materia[]) => {
          this.materie = materie;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      });
    });
    return promise;
  }

  async findAllStudent(): Promise<void>{
    let promise = new Promise<void>(() => {
      this.ricevitoreSegreteria.findAllStudent().subscribe({
        next: (studenti: Studente[]) => {
          this.studenti = studenti;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      });
    });
    return promise;
  }

  async findAllDocenti(): Promise<void>{
    let promise = new Promise<void>(() => {
      this.ricevitoreSegreteria.findAllDocenti().subscribe({
        next: (docenti: Docente[]) => {
          this.docenti = docenti;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      });
    });
    return promise;
  }

  saveStudente(form: FormGroup): void{
    this.ricevitoreSegreteria.saveStudente(form).subscribe({
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

  saveDocente(form: FormGroup): void{
    this.ricevitoreSegreteria.saveDocente(form).subscribe({
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

  deleteStudent(userCode: string): void{
    this.ricevitoreSegreteria.deleteStudent(userCode).subscribe({
      next: (message: string) => {
        this.message = message;
        this.check = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.check = 'false';
        if(error.status==401){
          this.message = 'Richiesta non autorizzata';
          return;
        }
        this.message = error.error;
      }
    });
  }

  deleteDocente(codiceFiscale: string): void{
    this.ricevitoreSegreteria.deleteDocente(codiceFiscale).subscribe({
      next: (message: string) => {
        this.message = message;
        this.check = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.check = 'false';
        if(error.status==401){
          this.message = 'Richiesta non autorizzata';
          return;
        }
        this.message = error.error;
      }
    });
  }

  getMaterie(): Materia[]{
    return this.materie;
  }
  
  getStudenti(): Studente[]{
    return this.studenti;
  }

  getDocenti(): Docente[]{
    return this.docenti;
  }

  getStudente(): Studente{
    return this.studente;
  }

  setStudente(studente: Studente): void{
    this.studente = studente;
  }

  getDocente(): Docente{
    return this.docente;
  }

  setDocente(docente: Docente): void{
    this.docente = docente;
  }
}
