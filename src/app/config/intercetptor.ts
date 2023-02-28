import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class Interceptor implements HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token: {token: string, utenza: string} = JSON.parse(localStorage.getItem("token"));

        if(token){
            request = request.clone({
                setHeaders: {
                    Authorization: token.token
                }
            })
        }
        return next.handle(request);
    }
}