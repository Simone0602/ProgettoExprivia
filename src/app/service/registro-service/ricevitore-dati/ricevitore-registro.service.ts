import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from 'src/app/class/Classe';
import { RegistroStudente } from 'src/app/class/RegistroStudente';
import { Studente } from 'src/app/class/Studente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreRegistroService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getRegistro(email: string): Observable<RegistroStudente>{
    return this.http.get<RegistroStudente>(`${this.url}/studente/${email}/getRegistro`);
  }

  public getListaClassi(codiceFiscale: string): Observable<Classe[]>{
    return this.http.get<Classe[]>(`${this.url}/docente/find/${codiceFiscale}`)
  }

  public getStudentiBySezione(sezione: string): Observable<Studente[]> {
    return this.http.get<Studente[]>(`${this.url}/classe/${sezione}/studenti`)
  }
}
