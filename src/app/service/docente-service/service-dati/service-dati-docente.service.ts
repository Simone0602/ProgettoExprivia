import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docente } from 'src/app/class/Docente';
import { RicevitoreDocenteService } from '../ricevitore-dati/ricevitore-docente.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiDocenteService {

  private docenti: Docente[] = [];

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

  getDocenti(): Docente[]{
    return this.docenti;
  }

}
