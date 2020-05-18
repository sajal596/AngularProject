import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/share/products.service';
import { GetCategory, Addbook, Uploadbook } from 'src/app/model/books';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  allCategory: GetCategory[] = [];
  angForm: FormGroup;
  skuValue = "";
  book: Uploadbook;
  currentFile: File;
  progress = 0;
  message = "";
  progressBar:boolean=false;
  selectedFiles: FileList;
  fileInfos: Observable<any>;
  skuError:boolean=false;

  constructor(private fb: FormBuilder, private services: ProductsService) {
    this.createForm();
    this.getCategories();
  }

  ngOnInit() {
    this.cleanAllField();
  }
cleanAllField(){
  this.book = {
    sku: "",
    name: "",
    description: "",
    unitPrice: 0,
    file: null,
    unitsInStock: 0,
    category: 0,
  };
}
  createForm() {
    this.angForm = this.fb.group({
      sku: ["", Validators.required],
      name: ["", Validators.required],
      file: ["", Validators.required],
      description: ["", Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      category: ["", Validators.required],
    });
  }

  getCategories() {
    this.services.getAllCategory().subscribe((data) => {
      this.allCategory = data["content"];
      console.log(this.allCategory);
    });
  }

  onSubmit(formValue: Uploadbook) {
    this.progress = 0;
    this.progressBar=true;

    this.currentFile = this.selectedFiles.item(0);
    this.book.sku = formValue.sku;
    this.book.name = formValue.name;
    this.book.file = this.currentFile;
    this.book.description = formValue.description;
    this.book.unitPrice = formValue.unitPrice;
    this.book.unitsInStock = formValue.unitsInStock;
    this.book.category = formValue.category;
    console.log(this.book);

    this.services.uploadBook(this.book).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          this.angForm.reset();
         
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
         
        }
      },
      (err) => {
        this.progress = 0;
        this.progressBar=false;
        this.message = "Could not upload the file!";
        this.currentFile = undefined;
      }
    );
   
    this.selectedFiles = undefined;
  }
  fileSize:boolean=false;
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    if(this.currentFile.size>500000){
     this.fileSize=true;
    }else{
      this.fileSize=false;
    }
    
  }
 
  checkSku() {
    if (this.skuValue != null) {
      this.services.CheckingSku(this.skuValue).subscribe((data) => {
        //console.log(data);
        if(data==true){
          this.skuError=true;
        }else{
          this.skuError=false;
        }
      });
    }
    
  }
}
