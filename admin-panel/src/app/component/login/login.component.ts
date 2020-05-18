import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/login';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/share/login.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loadUser:Login;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {

    this.loginService.isLogout();

    this.loadUser={
      "email":"",
      "password":""
    }
  }

  isLogin(login:Login){
    this.loadUser.email=login.email;
    this.loadUser.password=login.password;
    console.log(this.loadUser.email);
    this.loginService.isLogin(this.loadUser).subscribe(data=>{
 
      this.router.navigateByUrl("/dashboard");
     // console.log(data);
     this.getDecodeToken();
    },error=>{
    });
  }
  
  getDecodeToken(){
    var decoded = jwt_decode(sessionStorage.getItem("authenticationToken"));
    console.log(decoded.sub);
  }
}

