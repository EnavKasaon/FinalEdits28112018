export class Supplier {
   
    ID: number;
    companyName:string;
    Phone:string;
    Fax:string;
    ContactPerson: string;
    ContactPhone: string;
    GoodsType: string;
    SupplierType: string;
    Address: string;
   

    public constructor(init?: Partial<Supplier>) { 
        Object.assign(this, init);
    }
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
    
}
