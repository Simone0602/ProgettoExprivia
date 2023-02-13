import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroStudente } from 'src/app/class/RegistroStudente';
import { Studente } from 'src/app/class/Studente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreStudenteService {
  url = environment.baseUrl + '/studente';

  constructor(private http: HttpClient) { }

  public login(studente: {userCode: string, password: string}): Observable<Studente>{
    return this.http.post<Studente>(`${this.url}/loginStudente`, studente);
  }

  public sendEmail(studente: {mail: string, userCode: string}, tipoUtente: string): Observable<string>{
    return this.http.post(`${this.url}/sendEmail/${tipoUtente}`, studente, { responseType: 'text' });
  }

  public updatePassword(password: string, token: string): Observable<string>{
    return this.http.put(`${this.url}/updatePassword/${token}`, password, { responseType: 'text' });
  }

  public getToken(userCode: string): Observable<string>{
    return this.http.post(`${this.url}/getToken`, userCode, { responseType: 'text' });
  }

  public getRegistro(email: string): Observable<RegistroStudente>{
    return this.http.get<RegistroStudente>(`${this.url}/${email}/getRegistro`);
  }
}
