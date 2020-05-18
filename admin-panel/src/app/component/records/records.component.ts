import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/share/products.service';
import { Router } from '@angular/router';
import { Getbook, GetCategory } from 'src/app/model/books';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  page:number=0;
  rowSize:number=5;
  totalPage:Array<any>=[];
  allBooks:Getbook[]=[];
  selectedCategory=0;
  allCategory:GetCategory[]=[];
  productName:string='';

  angForm: FormGroup;
  constructor(private fb: FormBuilder,private services:ProductsService,private router:Router) {
    this.getCategories();
  }
 
  ngOnInit() {
  //  this.createForm();
    this.getBooks();
  
  
  }

  // createForm() {
  //   this.angForm = this.fb.group({
  //      name: ['', Validators.required ],
  //      address: ['', Validators.required ]
  //   });
  // }


  setPage(i,event:any){
    console.log(i+"+_+"+event)
    event.preventDefault();
    this.page=i;

    if(this.productName!=""){
    
      this.search();
    }else if(this.selectedCategory!=0){
    
      this.getSelectCategory();
    }
    else{
      this.getBooks();
    }
   
  }

  editPost(id){
    console.log(id);
    this.router.navigateByUrl("add/"+id);
  }
  

  
  getCategories(){
    this.services.getAllCategory().subscribe(data=>{
      this.allCategory=data['content'];
      console.log(this.allCategory)
    })
  }


  getBooks(){
    this.services.getAllBook(this.page,this.rowSize).subscribe(data=>{
     
      console.log(data);
      this.allBooks=data['content'];
      this.totalPage=new Array(data['totalPages']);
    })
  }
  // selectCategory;
  
  getSelectCategory() {
   
   // this.selectCategory = event.target.value;
   if(this.selectedCategory!=0){
   this.services.searchByCategory(this.selectedCategory,this.productName,this.page,this.rowSize).subscribe(data=>{
    console.log(data);
  
    this.allBooks=data['content'];
    this.totalPage=new Array(data['totalPages']);
    })
  }else if(this.productName!=""){
    this.search();
  }else{
    this.ngOnInit(); 
  }
    console.log(this.selectedCategory);
  
  }
  
  search(){
    if(this.productName!=""){
     this.services.searchBook(this.productName,this.page,this.rowSize).subscribe(data=>{
      console.log(data);
      this.allBooks=data['content'];
      this.totalPage=new Array(data['totalPages']);
      })
      // this.allBooks.filter(res=>{
      //   return res.name.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());
      // });
    }else if(this.productName==""){
      this.ngOnInit();  
    }
   
  }

}
