export class Product {   
    product_name:string;
    amount: number; 
    comments: string;

    public constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     return this;
    //   }
}
