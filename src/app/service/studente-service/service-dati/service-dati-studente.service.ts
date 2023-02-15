import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroStudente } from 'src/app/class/RegistroStudente';
import { RicevitoreStudenteService } from '../ricevitore-dati/ricevitore-studente.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiStudenteService {
  private _registro: RegistroStudente;

  constructor(private router: Router, private ricevitoreStudente: RicevitoreStudenteService) { }

  registro(): void{
    /* this.ricevitoreStudente.getRegistro(this._studente.mail).subscribe(({
      next: (_registro: RegistroStudente) => {
        this._registro = _registro;
      },
      error: (error: HttpErrorResponse) => {
        alert(`Qualcosa è andato storto\n${error.error}`)
      }
    })) */
  }

  getRegistro(): RegistroStudente{
    return this._registro;
  }
}
