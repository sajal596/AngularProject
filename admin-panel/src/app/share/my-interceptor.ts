import { Injectable, Inject } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable()
export class MyInterceptor  implements HttpInterceptor{
    constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService){}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {

        const token = this.localStorage.get("authenticationToken");
        console.log("tokken:" + token);
        
        if (token) {
          const cloned = request.clone({
            headers: request.headers.set("Authorization", "Bearer " + token),
          });
    
          console.log(request);
          return next.handle(cloned);
        } else {
          return next.handle(request);
        }
      }
    }