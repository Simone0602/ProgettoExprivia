import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  public get(endpoint: string): Observable<Object>{
    return this.http.get<Object>(endpoint);
  }

  public post(endpoint: string, obj: Object): Observable<Object>{
    return this.http.post<Object>(endpoint, obj);
  }

  public postWithResponseText(endpoint: string, obj: Object): Observable<string>{
    return this.http.post(endpoint, obj, { responseType: "text" });
  }

  public putWithResponseText(endpoint: string, obj: Object): Observable<string>{
    return this.http.put(endpoint, obj, { responseType: "text" });
  }

  public deleteWithResponseText(endpoint: string): Observable<string>{
    return this.http.delete(endpoint, { responseType: "text" });
  }

}
