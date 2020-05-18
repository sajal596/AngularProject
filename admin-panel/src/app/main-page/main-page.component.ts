import { Component, OnInit } from '@angular/core';
import { LoginService } from '../share/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private service:LoginService,private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.service.isLogout();
    this.router.navigateByUrl("/");
  }
}
