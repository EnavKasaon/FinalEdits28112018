import { Product } from "./Product";

export class OrderType {   
    order_type_id:number;
    order_type_name:string;
    supplier_id:number;
    products: Product[] = [];

    public constructor(init?: Partial<OrderType>) {
        Object.assign(this, init);
    }
    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     return this;
    //   }
}