import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGurdService implements CanActivate{
 
  constructor(private authServices:AuthService,private route:Router) { }

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
