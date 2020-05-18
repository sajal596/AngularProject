import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { AddUsers, Cart, CartBook, CartUpdate } from "../common/user-model";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private baseUrl = "http://localhost:8080";
  //private baseUrl = "https://bookstore12345.herokuapp.com";
  constructor(private httpClient: HttpClient) {}

  addNewUser(addUser: AddUsers): Observable<any> {
    return this.httpClient.post<AddUsers>(this.baseUrl + `/addUser`, addUser);
  }

  checkDouplicate(email:string) {
    return this.httpClient.get(this.baseUrl + `/checkEmail?email=${email}`);
  }

  addToCart(cart: Cart) {
    return this.httpClient.post<Cart>(this.baseUrl + `/addToCart`, cart);
  }

  getCartProduct(cart: Cart):Observable<CartBook> {
    return this.httpClient.get<CartBook>(this.baseUrl + `/getUserCart?email=${cart.userEmail}`);
  }

  getTotalCartSelection(email):Observable<number>{
    return this.httpClient.get<number>(this.baseUrl+`/cart/count?email=${email}`);
  }
  jwtHelper=new JwtHelperService();
  getUserEmail(){
    const tokenBreak=this.jwtHelper.decodeToken(sessionStorage.getItem("authenticationToken"));
    return tokenBreak.sub;
  }

  getUpdateCart(cart:CartUpdate){
    return this.httpClient.put<CartUpdate>(this.baseUrl+`/cart/update`,cart);
  }

  getTotalProductPrice(cart: Cart):Observable<CartBook> {
    return this.httpClient.get<CartBook>(this.baseUrl + `/totalPrice?email=${cart.userEmail}`);
  }

  deleteFormCartList(id:string){
    return this.httpClient.delete(this.baseUrl+`/cart/list/delete?id=${id}`);
  }

  sentFeedback(feedBack){
    return this.httpClient.post<Cart>(this.baseUrl + `/sentFeedback`, feedBack);
  }
}
