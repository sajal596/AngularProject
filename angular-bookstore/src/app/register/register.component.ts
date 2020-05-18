import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { AddUsers } from "../common/user-model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  addUser: AddUsers;
  emailValue = "";
  emailError: boolean = false;

  constructor(
    private userSerive: UsersService,
    private fromBuilder: FormBuilder,private toaster:ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cleanAllField();
  }

  createForm() {
    this.angForm = this.fromBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      mobile: ["", Validators.required],
    });
  }
  cleanAllField() {
    this.addUser = {
      username: "",
      email: "",
      password: "",
      mobile: "",
    };
  }

  createUser(formValue: AddUsers) {

    this.addUser.email=formValue.email;
    this.addUser.mobile=formValue.mobile;
    this.addUser.username=formValue.username;
    this.userSerive.addNewUser(this.addUser).subscribe(data=>{
     
      if(data){
        this.toaster.success(this.addUser.username+"is added","Registration");
        this.cleanAllField();
      }else{
        this.toaster.success("Contact softwareBd","Registration");
      }
     
    })
    console.log(formValue);
  }

  
  checkEmail(email: string) {
   
    this.userSerive.checkDouplicate(email).subscribe((data) => {
      if (data) {
        this.emailError = true;
      //  console.log(this.emailError)
      } else {
        this.emailError = false;
       // console.log(this.emailError)
      }
    });
  }
}
