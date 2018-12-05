export class Product {
   
    productId: number;
    productName: string;


    public constructor(init?: Partial< Product >) {
        Object.assign(this, init); }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;  }    
}
