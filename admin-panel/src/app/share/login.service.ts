import { Injectable, Inject } from '@angular/core';
import{JwtHelperService} from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { Login } from '../model/login';
import { JwtAuth } from '../model/jwt-auth';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string="http://localhost:8080";


 jwtHelper=new JwtHelperService();
   
 constructor(private http:HttpClient,
  //private localStorage:LocalStorageService,
  @Inject(LOCAL_STORAGE) private localStorage: StorageService) { }

 isLogin(login:Login):Observable<boolean>{
  return this.http.post<JwtAuth>(this.url+"/authenticate",login).pipe(map(data=>{
   this.localStorage.set('authenticationToken',data.token);
   
   sessionStorage.setItem("authenticationToken",data.token);

   const retrive=this.jwtHelper.decodeToken(data.token);
   console.log(retrive);
   
   return true;
  }));;
 }

 isAuthenticated():boolean{
  const token= this.localStorage.get("authenticationToken");
  
  if(token){
    return true;
  }else{
    false
  }
 }

 isSessionAuth():boolean{
   const token= sessionStorage.getItem("authenticationToken");
   if(token){
     return true;
   }else{
     false
   }
  }

 isLogout(){
   this.localStorage.remove("authenticationToken");
   sessionStorage.removeItem("authenticationToken");
 }
}
