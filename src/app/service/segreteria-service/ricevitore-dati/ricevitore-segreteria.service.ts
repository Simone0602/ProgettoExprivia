import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/class/Docente';
import { Materia } from 'src/app/class/Materia';
import { Studente } from 'src/app/class/Studente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreSegreteriaService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findAllMaterie(): Observable<Materia[]>{
    return this.http.get<Materia[]>(`${this.url}/segreteria/find-all-materie`);
  }

  public findAllStudent(): Observable<Studente[]>{
    return this.http.get<Studente[]>(`${this.url}/segreteria/find-all-student`);
  }

  public findAllDocenti(): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${this.url}/segreteria/find-all-docenti`);
  }

  public saveStudente(form: FormGroup): Observable<string>{
    return this.http.post(`${this.url}/segreteria/save-studente`, form.value, { responseType: 'text' });
  }

  public saveDocente(form: FormGroup): Observable<string>{
    return this.http.post(`${this.url}/segreteria/save-docente`, form.value, { responseType: 'text' });
  }

  public updateStudente(form: FormGroup): Observable<string>{
    return this.http.put(`${this.url}/segreteria/update-studente`, form.value, { responseType: 'text' });
  }

  public updateDocente(form: FormGroup): Observable<string>{
    return this.http.put(`${this.url}/segreteria/update-docente`, form.value, { responseType: 'text' });
  }

  public deleteStudent(userCode: string): Observable<string>{
    return this.http.delete(`${this.url}/segreteria/${userCode}/delete-studente`, { responseType: 'text' });
  }

  public deleteDocente(codiceFiscale: string): Observable<string>{
    return this.http.delete(`${this.url}/segreteria/${codiceFiscale}/delete-docente`, { responseType: 'text' });
  }
}
