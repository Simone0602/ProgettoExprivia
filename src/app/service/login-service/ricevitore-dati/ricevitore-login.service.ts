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

  public sendEmailStudente(studente: {mail: string, userCode: string}, tipoUtente: string): Observable<string>{
    return this.http.post(`${this.url}/studente/send-mail/${tipoUtente}`, studente, { responseType: 'text' });
  }

  public sendMessageStudente(studente: {number: string, userCode: string}, tipoUtente: string): Observable<string>{
    return this.http.post(`${this.url}/studente/send-message/${tipoUtente}`, studente, { responseType: 'text' });
  }

  public updatePassword(password: string, token: string): Observable<string>{
    return this.http.put(`${this.url}/studente/update-password/${token}`, password, { responseType: 'text' });
  }
}
