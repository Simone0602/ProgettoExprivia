import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Docente} from 'src/app/class/Docente';
import {Materia} from 'src/app/class/Materia';
import {Studente} from 'src/app/class/Studente';
import {ApiService} from "./api.service";
import {environment} from "../../environments/environment.development";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SegreteriaService {
  check: string;
  checkUpdate: string;
  message: string;
  messageUpdate: string;

  user: string;

  private docente: Docente;
  private studente: Studente;

  private studenti: Studente[] = [];
  private docenti: Docente[] = [];
  private materie: Materia[] = [];

  constructor(private apiService: ApiService) { }

  async findAllMaterie(): Promise<void>{
    return new Promise<void>(() => {
      this.apiService.get(environment.baseUrl + environment.segreteria + environment.findMaterieUrl)
        .pipe(map(response => Object.assign([], response)))
        .subscribe({
          next: (materie: Materia[]) => {
            this.materie = materie;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.error);
          }
        });
    });
  }

  async findAllStudent(): Promise<void>{
    return new Promise<void>(() => {
      this.apiService.get(environment.baseUrl + environment.segreteria + environment.findStudentiUrl)
        .pipe(map(response => Object.assign([], response)))
        .subscribe({
          next: (studenti: Studente[]) => {
            this.studenti = studenti;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.error);
          }
        });
    });
  }

  async findAllDocenti(): Promise<void>{
    return new Promise<void>(() => {
      this.apiService.get(environment.baseUrl + environment.segreteria + environment.findDocentiUrl)
        .pipe(map(response => Object.assign([], response)))
        .subscribe({
          next: (docenti: Docente[]) => {
            this.docenti = docenti;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.error);
          }
        });
    });
  }

  saveStudente(studente: Studente): void{
    this.apiService.postWithResponseText(
      environment.baseUrl + environment.segreteria + environment.saveStudente,
      studente)
      .subscribe({
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

  saveDocente(docente: Docente): void{
    this.apiService.postWithResponseText(
      environment.baseUrl + environment.segreteria + environment.saveDocente,
      docente)
      .subscribe({
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

  updateStudente(studente: Studente): void{
    this.apiService.putWithResponseText(
      environment.baseUrl + environment.segreteria + environment.updateStudente,
      studente)
      .subscribe({
        next: (message: string) => {
          this.messageUpdate = message;
          this.checkUpdate = 'true';
        },
        error: (error: HttpErrorResponse) => {
          this.messageUpdate = error.error;
          this.checkUpdate = 'false';
        }
      });
  }

  updateDocente(docente: Docente): void{
    this.apiService.putWithResponseText(
      environment.baseUrl + environment.segreteria + environment.updateDocente,
      docente)
      .subscribe({
        next: (message: string) => {
          this.messageUpdate = message;
          this.checkUpdate = 'true';
        },
        error: (error: HttpErrorResponse) => {
          this.messageUpdate = error.error;
          this.checkUpdate = 'false';
        }
      });
  }

  deleteStudent(userCode: string): void{
    this.apiService.deleteWithResponseText(environment.baseUrl + environment.segreteria + `/${userCode}` + environment.deleteStudente)
      .subscribe({
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
    this.apiService.deleteWithResponseText(environment.baseUrl + environment.segreteria + `/${codiceFiscale}` + environment.deleteDocente)
      .subscribe({
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
