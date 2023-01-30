import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Studente } from 'src/app/classi/Studente';
import { RicevitoreDatiStudenteService } from 'src/app/ricevitore-dati-studente/ricevitore-dati-studente.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatiStudenteService {
  studente: Studente;

  constructor(public ricevitoreDati: RicevitoreDatiStudenteService) { }

  login(studente: {userCode: string, pass: string}):void{
    this.ricevitoreDati.loginStudente(studente.userCode).subscribe({
      next: (studenteLoggato: Studente)=>{
        if(studenteLoggato.password==studente.pass){
          this.studente = studenteLoggato
          console.log("Accesso eseguito ");
          
        }else{
          console.log("Accesso negato")
        }
      },
      error: (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }
}
