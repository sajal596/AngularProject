export class Book {
  id: string;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  createdOn: Date;
  updatedOn: Date;
}
export class SingleBook {
  active: boolean;
  category: number;
  createdOn: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  sku: string;
  unitPrice: number;
  unitsInStock: number;
  updatedOn: string;
}
