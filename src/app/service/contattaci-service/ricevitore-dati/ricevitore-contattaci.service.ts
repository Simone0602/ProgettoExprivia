import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RicevitoreContattaciService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public sendMail(form: FormGroup): Observable<string>{
    return this.http.post(`${this.url}/contattaci/send-mail`, form.value, { responseType: 'text' });
  }
}
