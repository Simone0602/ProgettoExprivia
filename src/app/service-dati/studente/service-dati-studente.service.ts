import { Injectable } from '@angular/core';
import { Studente } from 'src/app/classi/Studente';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiStudenteService {
  studente: Studente = {
  }

  constructor() { }
}
