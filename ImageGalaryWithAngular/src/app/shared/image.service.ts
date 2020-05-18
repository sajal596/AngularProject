import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageDetailsList:AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) { 
    //this.imageDetaiilsList=null
    
    
  }

  getData():Observable<any>{
    return this.firebase.list('/imageDetails').snapshotChanges().pipe(
      map((products: any[]) => products.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    );
  }

  getImageDetailsList(){
    this.imageDetailsList=this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails){
    this.imageDetailsList=this.firebase.list('imageDetails');
    if(imageDetails){
      this.imageDetailsList.push({
        caption:imageDetails.caption,
        category:imageDetails.category,
        imageUrl:imageDetails.imageUrl
      });
    }
   // this.imageDetailsList.push(imageDetails);
  }

}
