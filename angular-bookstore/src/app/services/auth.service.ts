import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{JwtHelperService} from "@auth0/angular-jwt";
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { JwtAuth,Login } from '../common/user-model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://localhost:8080";
 // url:string="https://bookstore12345.herokuapp.com";

  jwtHelper=new JwtHelperService();
    
  constructor(private http:HttpClient,
   //private localStorage:LocalStorageService,
   @Inject(LOCAL_STORAGE) private localStorage: StorageService,private router:Router) { }
 
  isLogin(login:Login):Observable<boolean>{
   return this.http.post<JwtAuth>(this.url+"/authenticate",login).pipe(map(data=>{
    this.localStorage.set('authenticationToken',data.token);
    this.localStorage.set('customer',"dXNlcg");
   
    sessionStorage.setItem("authenticationToken",data.token);
    sessionStorage.setItem("customer","dXNlcg");
    return true;
   }));
  }
 
  isAuthenticated():boolean{
   const token= this.localStorage.get("authenticationToken");
   const customer=this.localStorage.get("customer");
   if(token&&customer){
     return true;
   }else{
     false
   }
  }
 
  isSessionAuth():boolean{
    const token= sessionStorage.getItem("authenticationToken");
    const customer= sessionStorage.getItem("customer");
    if(token&&customer){
      return true;
    }else{
      false
    }
   }
 
  isLogout(){
    this.localStorage.remove("authenticationToken");
    sessionStorage.removeItem("authenticationToken");
    this.localStorage.remove("customer");
    sessionStorage.removeItem("customer");
  }

  getBaseUrl(){
    return this.url;
  }

 }
 