export class Family {
   
    familyId: number; 
    firstName:string;
    lastName:string;
    street:string; 
    houseNum: string;
    floor: number;
    phone: number;
    peopleNumber: number; 
    notes: string;
    howDidYouHear: string;
    reasonForReferral: string;
    joinDate: Date;
    familyType: string;
    basketType: string;
    house: Boolean;
    car: Boolean;
    debt: Boolean; 
    payChecks: Boolean;
    bituahLeumi: Boolean;
    bankAccount: Boolean; 
    creditCard: Boolean;
    copyId: Boolean;
    rentContract: Boolean; 


    public constructor(init?: Partial< Family >) {
        Object.assign(this, init);}

    deserialize(input: any): this {
        Object.assign(this, input);
        return this; }  
}
