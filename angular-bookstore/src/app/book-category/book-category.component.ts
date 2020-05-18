import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookCategory } from '../common/book-category';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {


  categories:BookCategory[];
  constructor(private bookService:BookService) { 

    this.bookService.getBookCategory().subscribe(data=>{
     
      this.categories=data['content'];
     // console.log(this.categories);
    });
    //this.getCountOfBookByCategory(2);
  }

  ngOnInit() {
   
  }
 
}
