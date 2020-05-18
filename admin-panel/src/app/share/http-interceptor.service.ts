import { Injectable } from "@angular/core";

import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from 'ngx-webstorage-service';

// @Injectable({
//   providedIn: "root",
// })
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private $localStorage:StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.$localStorage.get("authenticationToken");
    console.log("tokken:" + token);
    
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });

      console.log(req);
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
