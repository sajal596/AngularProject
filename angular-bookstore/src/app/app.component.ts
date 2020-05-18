import { Component } from "@angular/core";
import { Book } from "./common/book";
import { BookService } from "./services/book.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "./services/users.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Software-BD";

  constructor(
    private router: Router,
    public service: AuthService,
    private toaster: ToastrService,
    private userService: UsersService
  ) {

    if(this.service.isAuthenticated()){
      var email=this.userService.getUserEmail();
      this.getTotalSelectedCart(email);
    }
  }

  Logout() {
    this.service.isLogout();
    this.router.navigateByUrl("/home");
    this.toaster.success("Logout successfully", "Authenticated");
  }

  totalCartSelect:number=0;
  getTotalSelectedCart(email){
    this.userService.getTotalCartSelection(email).subscribe(data=>{
      this.totalCartSelect=data;
    })
  }
}
