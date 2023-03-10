import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Assenza } from 'src/app/class/Assenza';
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

  public getRegistro(userCode: string): Observable<RegistroStudente>{
    return this.http.get<RegistroStudente>(`${this.url}/studente/${userCode}/get-registro`);
  }

  public getListaClassi(codiceFiscale: string): Observable<Classe[]>{
    return this.http.get<Classe[]>(`${this.url}/docente/find/${codiceFiscale}`)
  }

  public getStudentiBySezione(sezione: string): Observable<Studente[]> {
    return this.http.get<Studente[]>(`${this.url}/classe/${sezione}/studenti`)
  }

  // update docente tramite dati anagrafici
  public updateDocente(docente: FormGroup): Observable<string>{
    return this.http.put(`${this.url}/docente/update`, docente.value, { responseType: 'text' })
  }

  // update studente tramite dati anagrafici
  public updateStudente(studente: FormGroup): Observable<string>{
    return this.http.put(`${this.url}/studente/update`, studente.value, { responseType: 'text' })
  }

  //get assenze dello studente
  public getAssenze(userCode: string): Observable<Assenza[]>{
    return this.http.get<Assenza[]>(`${this.url}/studente/${userCode}/get-assenze`);
  }

  // update delle assenze (giustificazione)
  public giustificaAssenze(listAssenze: Assenza[], userCode: string): Observable<string>{
    return this.http.put(`${this.url}/studente/${userCode}/giustifica-assenze`, listAssenze, { responseType: 'text' });
  }
}
