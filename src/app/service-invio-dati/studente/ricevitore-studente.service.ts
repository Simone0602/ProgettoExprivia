import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Studente } from 'src/app/classi/Studente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreStudenteService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public login(studente: {userCode: string, pas: string}): Observable<Studente>{
    return this.http.post<Studente>(`${this.url}/studente/loginStudente`, studente);
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
