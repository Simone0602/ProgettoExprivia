import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Docente} from 'src/app/class/Docente';
import {Response} from 'src/app/class/Response';
import {Studente} from 'src/app/class/Studente';
import {map} from "rxjs";
import {ApiService} from "./api.service";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  message: string;
  checkUser: string;

  constructor(private router: Router,
    private apiService: ApiService) { }

  loginDocente(docente: {mail: string, codiceFiscale: string, password: string}): Promise<void>{
    const endpoint = `${environment.baseUrl}/auth/authenticate-docente`;

    return new Promise<void>(() => {
      this.apiService.post(endpoint, docente)
        .pipe(map(response => Object.assign(new Response(), response)))
        .subscribe({
          next: (token_docente: Response) => {
            token_docente.token = "Bearer " + token_docente.token;
            localStorage.setItem('token', JSON.stringify(token_docente));
            this.checkUser = 'true';
            this.message = 'Reindirizzamento al registro elettronico';
            setTimeout(() => {
              this.router.navigate(['/docente', 'registro', 'registro-docente']).then();
            }, 1500)
          },
          error: (error: HttpErrorResponse) => {
            this.checkUser = 'false'
            this.message = error.error.message;
          }
        });
    });
  }

  loginStudente(studente: {userCode: string, password: string}): Promise<void>{
    const endpoint = `${environment.baseUrl}/auth/authenticate-student`;

    return new Promise<void>(() => {
      this.apiService.post(endpoint, studente)
        .pipe(map(response => Object.assign(new Response(), response)))
        .subscribe({
          next: (token_studente: Response) => {
            token_studente.token = "Bearer " + token_studente.token;
            localStorage.setItem('token', JSON.stringify(token_studente));
            this.checkUser = 'true';
            this.message = 'Reindirizzamento al registro elettronico';
            setTimeout(() => {
              this.router.navigate(['/studente', 'registro', 'registro-famiglie']).then();
            }, 1500)
          },
          error: (error: HttpErrorResponse) => {
            this.checkUser = 'false'
            this.message = error.error.message;
          }
        });
    });
  }

  sendEmailStudente(studente: {mail: string, userCode: string}): void{
    this.apiService.postWithResponseText(
      environment.baseUrl + environment.studente + environment.sendMailUrl,
      studente)
      .subscribe({
        next: (message: string) => {
          this.message = message;
          this.checkUser = "true";
        },
        error: (error: HttpErrorResponse) => {
          this.checkUser = "false"
          this.message = error.error.message;
        }
      })
  }

  sendEmailDocente(docente: {mail: string, codiceFiscale: string}): void{
    this.apiService.postWithResponseText(
      environment.baseUrl + environment.docente + environment.sendMailUrl,
      docente)
      .subscribe({
        next: (message: string) => {
          this.message = message;
          this.checkUser = "true";
        },
        error: (error: HttpErrorResponse) => {
          this.checkUser = "false"
          this.message = error.error.message;
        }
      })
  }

  sendMessageStudente(studente: {number: string, userCode: string}): void{
    this.apiService.postWithResponseText(
      environment.baseUrl + environment.studente + environment.sendMessageUrl,
      studente)
      .subscribe({
      next: (message: string) => {
        this.message = message;
        this.checkUser = "true";
      },
      error: (error: HttpErrorResponse) => {
        this.checkUser = "false"
        this.message = error.error.message;
      }
    });
  }

  sendMessageDocente(docente: {number: string, codiceFiscale: string}): void{
    this.apiService.postWithResponseText(
      environment.baseUrl + environment.docente + environment.sendMessageUrl,
      docente)
      .subscribe({
        next: (message: string) => {
          this.message = message;
          this.checkUser = "true";
        },
        error: (error: HttpErrorResponse) => {
          this.checkUser = "false"
          this.message = error.error.message;
        }
      });
  }

  updatePassword(password: string, token: string, tipoUser: string): void{
    const endpoint = `${environment.baseUrl}/${tipoUser}/update-password/${token}`;

    this.apiService.putWithResponseText(endpoint, password)
      .subscribe({
        next: (message: string) => {
          this.message = message;
          this.checkUser = 'true';
        },
        error: (error: HttpErrorResponse) => {
          this.checkUser = 'false';
          this.message = error.error.message;
        }
      });
  }

  getStudente(userCode: string): Promise<Studente>{
    const endpoint = `${environment.baseUrl}/studente/${userCode}/get-studente`;

    return new Promise<Studente>((res, rej) => {
      this.apiService.get(endpoint)
        .pipe(map(response => Object.assign(new Studente(), response)))
        .subscribe({
          next: (studente: Studente) => {
            res(studente);
          },
          error: (error: HttpErrorResponse) => {
            rej(error.error);
          }
        });
    });
  }

  getDocente(codiceFiscale: string): Promise<Docente>{
    const endpoint = `${environment.baseUrl}/docente/${codiceFiscale}/get-docente`;

    return new Promise<Docente>((res, rej) => {
      this.apiService.get(endpoint)
        .pipe(map(response => Object.assign(new Docente(), response)))
        .subscribe({
          next: (docente: Docente) => {
            res(docente);
          },
          error: (error: HttpErrorResponse) => {
            rej(error.error);
          }
        });
    });
  }
}
