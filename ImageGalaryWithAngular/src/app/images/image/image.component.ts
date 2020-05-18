import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from "rxjs/operators"
import { ImageService } from 'src/app/shared/image.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  imageUrl;
  selectedImage:any=null;
  isSubmitted=false;
  isLoad:boolean=true;

  formTemplate=new FormGroup({
    caption:new FormControl('',Validators.required),
    category:new FormControl(''),
    imageUrl:new FormControl('',Validators.required)
  });
  
  constructor(private storage:AngularFireStorage,private service:ImageService ,private spinner:NgxSpinnerService) { 
    this.resetForm();
    //this.spinner.show();
  }

  ngOnInit() {
    
  //  this.spinner.show();
   
  }
 
  onSubmit(formValue){
    this.spinner.show();
  
    this.isSubmitted=true;

    if(this.formTemplate.valid){
      console.log(this.formTemplate);
      var filePath=`${formValue.category}/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef=this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).
      snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl']=url;
           // console.log(formValue);
            this.service.insertImageDetails(formValue);
           
            this.resetForm();
            this.timeOut();
          })
        })
      ).subscribe()
     
    }
   
  }

  get formControls(){
    return this.formTemplate['controls'];
  }

resetForm(){
  this.formTemplate.reset();
  this.formTemplate.setValue({
    caption:'',
    imageUrl:'',
    category:'Animal'
  });
  this.imageUrl='/assets/img/default.png';
  this.selectedImage=null;
  this.isSubmitted=false;
}

  showPreview(event:any){
   // console.log(event);
   this.spinner.show();
    if(event.target.files && event.target.files[0]){
      const reader=new FileReader();
      reader.onload=(e:any)=>this.imageUrl=e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage=event.target.files[0];
     
     // console.log(this.selectedImage);
    }else{
      this.imageUrl='/assets/img/default.png';
      this.selectedImage=null;
    }
   this.timeOut();
  }
  private timeOut(){
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  
}
