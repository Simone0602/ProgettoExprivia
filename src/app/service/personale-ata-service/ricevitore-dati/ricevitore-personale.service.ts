import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from 'src/app/class/Classe';
import { Docente } from 'src/app/class/Docente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitorePersonaleService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getListaDocenti(): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${this.url}/docente/findAll`);
  }

  public getListaClassi(): Observable<Classe[]>{
    return this.http.get<Classe[]>(`${this.url}/classe/findAll`);
  }
}
