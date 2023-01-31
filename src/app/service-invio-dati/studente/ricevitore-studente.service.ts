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

  public resetPassword(studente: {mail: string, userCode: string}): Observable<string>{
    return this.http.post(`${this.url}/studente/resetPassword`, studente, { responseType: 'text' });
  }
}
