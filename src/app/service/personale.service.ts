import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { Docente } from 'src/app/class/Docente';
import {ApiService} from "./api.service";
import {environment} from "../../environments/environment.development";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonaleService {

  private docenti: Docente[] = [];
  private classi: Classe[] = [];

  constructor(private apiService: ApiService) { }

  getListaDocenti(): void{
    this.apiService.get(environment.baseUrl + environment.docente + environment.listaUrl)
      .pipe(map(response => Object.assign([], response)))
      .subscribe({
        next: (docenti: Docente[]) => {
          this.docenti = docenti;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      })
  }

  getListaClassi(): void{
    this.apiService.get(environment.baseUrl + environment.classe + environment.listaUrl)
      .pipe(map(response => Object.assign([], response)))
      .subscribe({
        next: (classi: Classe[]) => {
          this.classi = classi;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      })
  }

  getClassi(): Classe[]{
    return this.classi;
  }

  getDocenti(): Docente[]{
    return this.docenti;
  }
}
