import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Feedback } from '../common/user-model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-contant',
  templateUrl: './contant.component.html',
  styleUrls: ['./contant.component.css']
})
export class ContantComponent implements OnInit {

  constructor(private userService:UsersService,private authService:AuthService,private toaster:ToastrService) { }

  ngOnInit() {
  }
  feedBack:Feedback={
    "email":"",
    "message":""
  }
  jwtHelper=new JwtHelperService();
  isSent(formValue){

    var authChecking=this.authService.isAuthenticated();
    if(typeof authChecking!== "undefined"){

      const tokenBreak=this.jwtHelper.decodeToken(sessionStorage.getItem("authenticationToken"));

      this.feedBack.email=tokenBreak.sub;
      this.feedBack.message=formValue.message;
      this.userService.sentFeedback(this.feedBack).subscribe(
        data=>{
          this.toaster.success("Sent your feedback","Message");
        }
      ),error=>{
        this.toaster.error("Server error","Message");
      }
      
    }else{
      this.toaster.info("Login your account","Message");
    }
   
  }

}
