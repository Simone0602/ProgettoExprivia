import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Classe } from 'src/app/class/Classe';
import { Docente } from 'src/app/class/Docente';
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

  public updateDocente(docente: FormGroup): Observable<string>{
    const header = new HttpHeaders({
      Authorization: JSON.parse(localStorage.getItem('token')).token
    });
    return this.http.put(`${this.url}/docente/update`, docente.value, { headers: header, responseType: 'text' })
  }

  public updateStudente(studente: FormGroup): Observable<string>{
    const header = new HttpHeaders({
      Authorization: JSON.parse(localStorage.getItem('token')).token
    });
    return this.http.put(`${this.url}/studente/update`, studente.value, { headers: header, responseType: 'text' })
  }
}
