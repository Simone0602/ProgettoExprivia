import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { RicevitoreClasseService } from '../ricevitore-dati/ricevitore-classe.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiCalsseService {

  private classi: Classe[] = [];

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
  
  getClassi(): Classe[]{
    return this.classi;
  }

}
