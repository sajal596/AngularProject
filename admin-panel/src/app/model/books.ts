export class Addbook {
 public name: String;
 public description: String;
 public unitPrice: number;
 public imageUrl: Blob;
 public unitsInStock: number;
 public category: number;
}
// name: "Enter Name"
// description: "this is product description"
// inputImage: ""
// stock: "21432"
// price: "21321"
// category: "4"
export class Uploadbook {
    public sku:string;
    public name: String;
    public description: string;
    public unitPrice: number;
    public file: File;
    public unitsInStock: number;
    public category: number;
   }
   
export class Getbook {
    public id: String;
    public sku: String;
    public name: String;
    public description: String;
    public unitPrice: number;
    public imageUrl: String;
    public active: boolean;
    public unitsInStock: number;
    public createdOn: Date;
    public updatedOn: Date;
    public category: number;
   }

   export class GetCategory {
    public id: string;
    public category_name:string;
    public active:boolean;
   }