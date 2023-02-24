import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/class/Docente';
import { Response } from 'src/app/class/Response';
import { Studente } from 'src/app/class/Studente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreLoginService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //login studente
  public loginStudente(studente: {userCode: string, password: string}): Observable<Response>{
    return this.http.post<Response>(`${this.url}/auth/authenticate-student`, studente);
  }

  //login docente
  public loginDocente(docente: {mail: string, codiceFiscale: string, password: string}): Observable<Response>{
    return this.http.post<Response>(`${this.url}/auth/authenticate-docente`, docente);
  }

  // send mail studente
  public sendEmailStudente(studente: {mail: string, userCode: string}): Observable<string>{
    return this.http.post(`${this.url}/studente/send-mail`, studente, { responseType: 'text' });
  }

  // send mail docente
  public sendEmailDocente(docente: {mail: string, codiceFiscale: string}): Observable<string>{
    return this.http.post(`${this.url}/docente/send-mail`, docente, { responseType: 'text' });
  }

  // send message studente
  public sendMessageStudente(studente: {number: string, userCode: string}): Observable<string>{
    return this.http.post(`${this.url}/studente/send-message`, studente, { responseType: 'text' });
  }

  //seend message docente
  public sendMessageDocente(docente: {number: string, codiceFiscale: string}): Observable<string>{
    return this.http.post(`${this.url}/docente/send-message`, docente, { responseType: 'text' });
  }

  //update password sia per docente che per studente grazie al tipoUser
  public updatePassword(password: string, token: string, tipoUser: string): Observable<string>{
    return this.http.put(`${this.url}/${tipoUser}/update-password/${token}`, password, { responseType: 'text' });
  }

  public getStudente(userCode: string, token: string): Observable<Studente>{
    const header = new HttpHeaders({
      Authorization: token
    })
    return this.http.get<Studente>(`${this.url}/studente/${userCode}/get-studente`, { headers: header });
  }

  public getDocente(codiceFiscale: string, token: string): Observable<Docente>{
    const header = new HttpHeaders({
      Authorization: token
    })
    return this.http.get<Docente>(`${this.url}/docente/${codiceFiscale}/get-docente`, { headers: header });
  }
}
