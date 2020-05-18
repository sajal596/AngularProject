import { Component, OnInit } from '@angular/core';
import { Login } from '../common/user-model';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loadUser:Login;
  constructor(private loginService:AuthService,private router:Router,private toastr: ToastrService) { }

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
    this.loginService.isLogin(this.loadUser).subscribe(data=>{
      console.log(data)
      if(data){
        this.router.navigateByUrl("/home");
        this.toastr.success('Correct!', 'Authentication');
      }else{
        this.toastr.error('Fail!', 'Authentication');
      }
 
    },error=>{
      this.router.navigateByUrl("/login");
      this.toastr.success('Fail!', 'Authentication');
    });
  }
  
}