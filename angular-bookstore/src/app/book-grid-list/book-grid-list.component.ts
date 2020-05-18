import { Component, OnInit } from "@angular/core";
import { Book } from "../common/book";
import { BookService } from "../services/book.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cart } from '../common/user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-book-grid-list",
  templateUrl: "./book-grid-list.component.html",
  styleUrls: ["./book-grid-list.component.css"],
})
export class BookGridListComponent implements OnInit {
  books: Book[] = [];
  currentCategoryId: number = null;
  searchText: string = "";
  pageNo: number = 0;
  pageSize: number = 9;
  baseUrl:string;
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService,
    private userService:UsersService,private toaster:ToastrService
  ) {
    //console.log(this.books);
    this.baseUrl=this.authService.getBaseUrl();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
      
    });
   // this.listBooks();
  }
  
  totalPage:Array<any>=[];
  setPage(i,event:any){
    console.log(i+"+_+"+event)
    event.preventDefault();
    this.pageNo=i;

    if(this.searchText!=""){
    
      this.listBooks();
    }
    else{
      this.listBooks();
    }
   
  }

  listBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has(
      "id"
    );
    //console.log(this.activatedRoute.snapshot.paramMap.has("id"));

    if (hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get("id");
      this.bookService
        .getCategorySearch(
          this.currentCategoryId,
          this.searchText,
          this.pageNo,
          this.pageSize
        )
        .subscribe((data) => {
          this.books = data["content"];
          this.totalPage=new Array(data['totalPages']);
          //console.log(this.books);
        });
      //console.log("hasCategoryId: " + this.currentCategoryId);
    } else {
      this.currentCategoryId = null;
      this.bookService
        .getBooks(this.searchText, this.pageNo, this.pageSize)
        .subscribe((data) => {
          this.books = data["content"];
          this.totalPage=new Array(data['totalPages']);
         // console.log(this.books);
        });
     // console.log("Default hasCategoryId: " + this.currentCategoryId);
    }
  }
  searchBook(){
      this.listBooks();
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
    }else{
      this.toaster.error("Login your account","Shopping cart");
    }
   
  }
}
