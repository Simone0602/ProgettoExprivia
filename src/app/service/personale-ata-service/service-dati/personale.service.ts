import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { Docente } from 'src/app/class/Docente';
import { RicevitorePersonaleService } from '../ricevitore-dati/ricevitore-personale.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaleService {

  private docenti: Docente[] = [];
  private classi: Classe[] = [];


  constructor(private ricevitorePersonale: RicevitorePersonaleService) { }

  getListaDocenti(): void{
    this.ricevitorePersonale.getListaDocenti().subscribe({
      next: (docenti: Docente[]) => {
        this.docenti = docenti;
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
  
  getListaClassi(): void{
    this.ricevitorePersonale.getListaClassi().subscribe({
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
