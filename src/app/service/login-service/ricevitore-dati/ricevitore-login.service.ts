import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/class/Docente';
import { Studente } from 'src/app/class/Studente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreLoginService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public loginStudente(studente: {userCode: string, password: string}): Observable<Studente>{
    return this.http.post<Studente>(`${this.url}/studente/login`, studente);
  }

  public loginDocente(docente: {mail: string, codiceFiscale: string, password: string}): Observable<Docente>{
    return this.http.post<Docente>(`${this.url}/docente/login`, docente);
  }

  public sendEmail(studente: {mail: string, userCode: string}, tipoUtente: string): Observable<string>{
    return this.http.post(`${this.url}/studente/sendEmail/${tipoUtente}`, studente, { responseType: 'text' });
  }

  public updatePassword(password: string, token: string): Observable<string>{
    return this.http.put(`${this.url}/studente/updatePassword/${token}`, password, { responseType: 'text' });
  }

  public getToken(userCode: string): Observable<string>{
    return this.http.post(`${this.url}/studente/getToken`, userCode, { responseType: 'text' });
  }
}
