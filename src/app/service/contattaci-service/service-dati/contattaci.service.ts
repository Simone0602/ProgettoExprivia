import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RicevitoreContattaciService } from '../ricevitore-dati/ricevitore-contattaci.service';

@Injectable({
  providedIn: 'root'
})
export class ContattaciService {

  message: string;
  check: string;

  constructor(private contattaciRicevitore: RicevitoreContattaciService) { }

  sendMail(form: FormGroup){
    this.contattaciRicevitore.sendMail(form).subscribe({
      next: (message: string) => {
        this.message = message;
        this.check = 'true';
      },
      error: (error: HttpErrorResponse) => {
        this.check = 'false';
        if(error.status == 400){
          this.message = "Error sending e-mail";
        }else {
          this.message = error.error;
        }
      }
    })
  }
}
