import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { Docente } from 'src/app/class/Docente';
import { RicevitoreDocenteService } from '../ricevitore-dati/ricevitore-docente.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiDocenteService {

  private docenti: Docente[] = [];
  private classi: Classe[] = [];
  private docente: Docente = { 
    id: 0,
    nome: ' ' ,
    cognome: ' ' ,
    mail: ' ',
    password: ' ',
    codiceFiscale: 'abcdefg',
    materia: ' '
  };

  constructor(private ricevitoreDocenti: RicevitoreDocenteService) { }

  getListaDocenti(): void{
    this.ricevitoreDocenti.getListaDocenti().subscribe({
      next: (docenti: Docente[]) => {
        this.docenti = docenti;
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
  
  getListaClassi(codiceFiscale: string): void{
    this.ricevitoreDocenti.getListaClassi(codiceFiscale).subscribe({
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

  getDocente(): Docente{
    return this.docente;
  }

  getDocenti(): Docente[]{
    return this.docenti;
  }
  
}
