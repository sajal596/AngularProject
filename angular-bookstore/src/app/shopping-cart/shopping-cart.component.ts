import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { Cart, CartBook, CartUpdate } from "../common/user-model";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { AuthService } from "../services/auth.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  value1 = 1;
  baseUrl:string;
  constructor(
    private cartservice: UsersService,
    private authService: AuthService,
    private fromBuilder: FormBuilder
  ) {
    this.createForm();
    this.baseUrl=this.authService.getBaseUrl();
  }
  cartBook: any;
  cart: Cart = {
    productId: "",
    userEmail: "",
  };
  angForm: FormGroup;
  createForm() {
    this.angForm = this.fromBuilder.group({
      retailPrice: ["", Validators.required],
    });
  }
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    if (this.authService.isSessionAuth()) {
      this.cart.userEmail = this.cartservice.getUserEmail();

      this.cartservice.getCartProduct(this.cart).subscribe((data) => {
        this.cartBook = data;
        this.getSum();
      });
    }
  }

  finalTtotalAmount;
  getSum() {
    this.cartservice.getTotalProductPrice(this.cart).subscribe(data=>{
      this.finalTtotalAmount=data;
    });
   
  }

  deleteBookFromCart(id) {
    console.log("delete Book from cart");
    this.cartservice.deleteFormCartList(id).subscribe(data=>{
      console.log(data);
      this.ngOnInit();
    })
  }

  quantity = 1;
  totalAmount = 0;
  updateTotal(retailPrice: number, quantity: number, id: number) {
   
    this.cartUpdateModel.unitPrice = retailPrice.toString();
    this.cartUpdateModel.cartId = id.toString();
    this.cartUpdateModel.qty = quantity.toString();
    this.cartservice.getUpdateCart(this.cartUpdateModel).subscribe((date) => {
      console.log("Successgull:" + date);
    });
    this.getSum();
    
 }
 

  cartUpdateModel: CartUpdate = {
    cartId: "",
    unitPrice: "",
    qty: "",
  };
  
}
