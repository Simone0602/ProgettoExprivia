import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Assenza} from 'src/app/class/Assenza';
import {Classe} from 'src/app/class/Classe';
import {Docente} from 'src/app/class/Docente';
import {RegistroStudente} from 'src/app/class/RegistroStudente';
import {Studente} from 'src/app/class/Studente';
import {ApiService} from "./api.service";
import {environment} from "../../environments/environment.development";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  loading: boolean = true;

  message: string;
  check: string = '';

  private studente: Studente;
  private docente: Docente;

  private registro: RegistroStudente;
  private assenze: Assenza[] = [];
  private classi: Classe[] = [];
  private studenti: Studente[] = [];

  constructor(private apiService: ApiService) {
  }

  async callGetRegistro(userCode: string): Promise<void> {
    return new Promise<void>(() => {
      this.apiService.get(environment.baseUrl + environment.studente + `/${userCode}` + environment.getRegistroUrl)
        .pipe(map(response => Object.assign(new RegistroStudente(), response)))
        .subscribe(({
          next: (registro: RegistroStudente) => {
            this.registro = registro;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.error)
          }
        }));
    });
  }

  getListaClassi(codiceFiscale: string): void {
    this.apiService.get(environment.baseUrl + environment.docenteFind + `/${codiceFiscale}`)
      .pipe(map(response => Object.assign([], response)))
      .subscribe({
        next: (classi: Classe[]) => {
          this.classi = classi;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      });
  }

  getStudentiBySezione(sezione: string): void {
    this.apiService.get(environment.baseUrl + environment.classe + `/${sezione}/studenti`)
      .pipe(map(response => Object.assign([], response)))
      .subscribe({
        next: (studenti: Studente[]) => {
          this.studenti = studenti;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      });
  }

  updateDocente(docente: Docente): void {
    this.apiService.putWithResponseText(
      environment.baseUrl + environment.docente + environment.updateUrl,
      docente)
      .subscribe({
        next: (message: string) => {
          this.message = message;
          this.check = 'true';
        },
        error: (error: HttpErrorResponse) => {
          this.message = error.error;
          this.check = 'false';
        }
      });
  }

  updateStudent(studente: Studente): void {
    this.apiService.putWithResponseText(
      environment.baseUrl + environment.studente + environment.updateUrl,
      studente)
      .subscribe({
        next: (message: string) => {
          this.message = message;
          this.check = 'true';
        },
        error: (error: HttpErrorResponse) => {
          this.message = error.error + 'Si prega di cambiarla se si vuole eseguire una modifica';
          this.check = 'false';
        }
      });
  }

  callGetAssenze(userCode: string): Promise<void> {
    return new Promise<void>(() => {
      this.apiService.get(
        environment.baseUrl + environment.studente + `/${userCode}` + environment.assenzeUrl)
        .pipe(map(response => Object.assign([], response)))
        .subscribe({
          next: (assenze: Assenza[]) => {
            this.assenze = assenze;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.error);
          }
        });
    });
  }

  giustificaAssenze(listaAssenze: Assenza[], userCode: string): void {
    this.apiService.putWithResponseText(
      environment.baseUrl + environment.studente + `/${userCode}` + environment.giustificaAssenzeUrl,
      listaAssenze)
      .subscribe({
        next: (message: string) => {
          this.message = message;
          this.check = 'true';
        },
        error: (error: HttpErrorResponse) => {
          this.message = error.error;
          this.check = 'false';
        }
      });
  }

  getRegistro(): RegistroStudente {
    return this.registro;
  }

  getAssenze(): Assenza[] {
    return this.assenze;
  }

  getClassi(): Classe[] {
    return this.classi;
  }

  getStudenti(): Studente[] {
    return this.studenti
  }

  setStudenti(studenti: Studente[]): void {
    this.studenti = studenti;
  }

  getStudenteDatiAnagrafici(): any {
    return this.studente;
  }

  setStudenteDatiAnagrafici(studente: Studente): void {
    this.studente = studente;
  }

  getDocenteDatiAnagrafici(): Docente {
    return this.docente;
  }

  setDocenteDatiAnagrafici(docente: Docente): void {
    this.docente = docente;
  }
}
