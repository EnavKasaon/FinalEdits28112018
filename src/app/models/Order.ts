import { OrderType } from "./OrderType";

export class Order {   
    order_id:number;
    order_type:OrderType;
    order_date:Date;
    received_date: Date;
    received: boolean;

    public constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }
    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     return this;
    //   }
}