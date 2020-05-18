import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';
import { AngularFireDatabase ,AngularFireObject} from '@angular/fire/database';


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  imageList:any[];
  rowIndexArray:any[];
  imageList2:any[];
  constructor(private service:ImageService,private db:AngularFireDatabase) { }

  ngOnInit() {
    this.db.list('/imageDetails').snapshotChanges().subscribe(
      list=>{
        this.imageList= list.map(item=>
           {
             return item.payload.val();
           });
           this.rowIndexArray=Array.from(Array(Math.ceil(this.imageList.length/3)).keys());
           console.log(this.imageList.length);
           console.log(this.rowIndexArray);
       }
    
    )
  
  
  }

}
