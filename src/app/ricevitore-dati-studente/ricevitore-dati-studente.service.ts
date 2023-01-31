import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Studente } from '../classi/Studente';

@Injectable({
  providedIn:"root"
})
export class RicevitoreDatiStudenteService {
  url= environment.baseUrl
  
  constructor (private http: HttpClient){}

  public loginStudente(userCode: string):Observable<Studente>{
    return this.http.post<Studente>(`${this.url}/studente/loginStudente`, userCode);
  }
}
