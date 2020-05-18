export class Users{
    id:string
    username:string;
    email:string;
    password:string;
    mobile:number;
}
export class AddUsers{
    username:string;
    email:string;
    password:string;
    mobile:string;
}
export class JwtAuth {
    constructor( public token:string){ }
}

export class Login {
    constructor(public email: string, public password: string) {}
  }

  export class Cart{
      constructor(public userEmail:string,public productId:string){}
  }

  export class CartUpdate{
    constructor(public cartId:string,public unitPrice:string,public qty:string){}
}

  export class CartBook {
    id:string
    sku: string;
    name: string;
    description:string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    date_create: Date;


}

export class Feedback{
    constructor(public message:string,
        public email:string){}
}
