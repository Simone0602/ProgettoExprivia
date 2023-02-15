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

  public getRegistro(email: string): Observable<RegistroStudente>{
    return this.http.get<RegistroStudente>(`${this.url}/${email}/getRegistro`);
  }
}
