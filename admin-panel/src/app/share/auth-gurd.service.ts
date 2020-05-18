import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGurdService implements CanActivate{
 
  constructor(private authServices:LoginService,private route:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
    {
      if(this.authServices.isAuthenticated()){
        return true;
      }else{
        this.route.navigateByUrl("/login")
        return false;
      }
      
  }
}
