import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, SingleBook } from '../common/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseBookUrl="http://localhost:8080";
 // private baseBookUrl="https://bookstore12345.herokuapp.com";
  
  constructor(private httpClient:HttpClient) { }

  getSingleBook(id:string):Observable<SingleBook>{
    return this.httpClient.get<SingleBook>(this.baseBookUrl+`/book/${id}`);
  }
  getBooks(name:string,pageNo:number,size:number):Observable<any>{
    return this.httpClient.get(this.baseBookUrl+`/books??name=${name}&page=${pageNo}&size=${size}`);
  }
 
  getCategorySearch(category:number,name:string,pageNo:number,size:number):Observable<any>{
    // let searchUrl= `${this.baseUrl}/search/categoryId?id=${theCategoryId}`;

    return this.httpClient.get(this.baseBookUrl+`/catagory/search/books?category=${category}&name=${name}&page=${pageNo}&size=${size}`);
  }
  getBookCategory():Observable<any>{
    return this.httpClient.get(this.baseBookUrl+`/categories`);
  }

  getCountBookByCategory(id:number):Observable<any>{
    return this.httpClient.get(this.baseBookUrl+`/book/count/${id}`);
  }
}
