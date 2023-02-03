import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from 'src/app/class/Classe';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreClasseService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getListaClassi(): Observable<Classe[]>{
    return this.http.get<Classe[]>(`${this.url}/classe/findAll`);
  }
}
