import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGurdService implements CanActivate {

  constructor(private authSerive:LoginService,private route:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
    {
      if(this.authSerive.isAuthenticated()){
        return true;
      }else{
        this.route.navigateByUrl("/login")
        return false;
      }
      
  }

}
