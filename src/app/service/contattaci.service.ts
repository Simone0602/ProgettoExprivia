import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ApiService} from "./api.service";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ContattaciService {

  message: string;
  check: string;

  constructor(private apiService: ApiService) { }

  sendMail(form: FormGroup){
    this.apiService.postWithResponseText(
      environment.baseUrl + environment.contattaciUrl, form.value)
      .subscribe({
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
