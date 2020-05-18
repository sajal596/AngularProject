import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/share/login.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/share/products.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private services:ProductsService,private router:Router) {
    this.checkingToken();
   }

  ngOnInit() {
   this.checkingToken();
  }

  checkingToken(){
    var token=sessionStorage.getItem("authenticationToken");
    if(token){
      this.router.navigateByUrl("/dashboard");
    }else{
      this.router.navigateByUrl("/login");
    }
  }

  // getBooks(){
  //   this.services.getAllBook(10,10).subscribe(data=>{
  //     console.log(data);
  //   })
  // }
}
