import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private http:HttpClient) { }

  getBookData(text:string){
    return this.http.get(`http://localhost:8080/tests?name=${text}&sku=${text}&page=0&size=5`)
    .pipe(
      debounceTime(500),
      map((data:any)=>{
        return data;
      })
    );
  }
}
