import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Addbook, Getbook, GetCategory, Uploadbook } from '../model/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url:string="http://localhost:8080";

  constructor(private http:HttpClient) { }


 

  createBook(book:Addbook){
    return this.http.post<Addbook>(this.url+"/addbook",book);
  }

  getAllBook(pageNo:number,size:number):Observable<any>{
    return this.http.get<Getbook>(this.url+`/books?page=${pageNo}&size=${size}`);
  }

  searchBook(name:string,pageNo:number,size:number):Observable<any>{
    return this.http.get<Getbook>(this.url+`/books?name=${name}&page=${pageNo}&size=${size}`);
  }

  searchByCategory(category:number,name:string,pageNo:number,size:number):Observable<any>{
    return this.http.get<Getbook>(this.url+`/catagory/search/books?category=${category}&name=${name}&page=${pageNo}&size=${size}`);
  }

  getSingleBook(id:string):Observable<any>{
     return this.http.get<Getbook>(this.url+`/book/${id}`);
  }

  // getSelfPost(id:string,pageNo:number,size:number):Observable<any>{
  //   return this.http.get<GetPosts>(this.url+`/blog/self/${id}?page=${pageNo}&size=${size}`);
  // }


  getUpdateBook(book:Addbook,email:string){
    return this.http.put<Addbook>(this.url+`/book/${email}`,book);
  }

  getAllCategory(){
    return this.http.get<GetCategory>(this.url+`/categories`);
  }

  addProducts(addBook:Addbook):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':'multipart/form-data'})
      }
    return this.http.post<Addbook>(
      this.url+`/addbook`,addBook);
  }

  uploadBook(uploadBook: Uploadbook): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', uploadBook.file);
    formData.append('sku',uploadBook.sku);
    formData.append('name',''+uploadBook.name);
    formData.append('description',uploadBook.description);
    formData.append('unitPrice',uploadBook.unitPrice.toString());
    formData.append('unitsInStock',uploadBook.unitsInStock.toString());
    formData.append('category',''+uploadBook.category);
   
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  CheckingSku(sku:string):Observable<any>{
    return this.http.get(this.url+`/sku?sku=${sku}`)
  }
  
}
