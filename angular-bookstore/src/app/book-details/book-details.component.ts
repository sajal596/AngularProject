import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book, SingleBook } from '../common/book';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cart } from '../common/user-model';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  baseUrl:string;
  constructor(private bookService:BookService,private route:ActivatedRoute,private authService:AuthService,private userService:UsersService,private toaster:ToastrService) { 
    this.baseUrl=this.authService.getBaseUrl();
  }

  ngOnInit() {
   this.gerSingleBookDetails();
  }
  bookId;
  singleBook:SingleBook={
    active: true,
    category:0,
    createdOn: '',
    description: '',
    id: 0,
    imageUrl: '',
    name: '',
    sku: '',
    unitPrice: 0,
    unitsInStock: 0,
    updatedOn: ''
  };
  gerSingleBookDetails(){
   this.bookId= this.route.snapshot.paramMap.get("id");
    this.bookService.getSingleBook(this.bookId).subscribe(data=>{
     this.singleBook=data;
   //  console.log(this.singleBook)
     
    })
  }

  jwtHelper=new JwtHelperService();
  cart:Cart={
    "productId":"",
    "userEmail":""
  };
  
  AddToCart(productId:string){
    var checkAuth=this.authService.isAuthenticated();
    if(typeof checkAuth!== "undefined"){
    
      const tokenBreak=this.jwtHelper.decodeToken(sessionStorage.getItem("authenticationToken"));

      this.cart.productId=productId;
      this.cart.userEmail=tokenBreak.sub;
   
      this.userService.addToCart(this.cart).subscribe(data=>{
        //console.log(data);
        if(data){
          this.toaster.success("Successfully added","Shopping cart");
        }else{
          this.toaster.error("Already added!","Shopping cart");
        }
        
      },error=>{
       /// console.log("error arise")
        this.toaster.error("Error ocure","Shopping cart");
      });
      
     // console.log("Authenticated"+ productId)
    }else{
      this.toaster.error("Login your account","Shopping cart");
    }
  }

}
