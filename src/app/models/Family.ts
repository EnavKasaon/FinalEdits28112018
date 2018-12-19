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
    house: boolean;
    car: boolean;
    debt: boolean; 
    payChecks: boolean;
    bituahLeumi: boolean;
    bankAccount: boolean; 
    creditCard: boolean;
    copyId: boolean;
    rentContract: boolean; 


    public constructor(init?: Partial< Family >) {
        Object.assign(this, init);}

    deserialize(input: any): this {
        Object.assign(this, input);
        return this; }  
}
