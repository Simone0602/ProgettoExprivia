import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { Studente } from 'src/app/class/Studente';
import { RicevitoreClasseService } from '../ricevitore-dati/ricevitore-classe.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiCalsseService {

  private classi: Classe[] = [];
  private studenti: Studente[] = [];

  constructor(private ricevitoreClasse: RicevitoreClasseService) { }

  getListaClassi(): void{
    this.ricevitoreClasse.getListaClassi().subscribe({
      next: (classi: Classe[]) => {
        this.classi = classi;
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
  
  getStudentiBySezione(sezione: string): void{
    this.ricevitoreClasse.getStudentiBySezione(sezione).subscribe({
      next: (studenti: Studente[]) => {
        this.studenti = studenti;
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    });
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
