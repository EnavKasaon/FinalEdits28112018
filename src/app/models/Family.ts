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
    joinDate: string;
    familyType: string;
    basketType: string;
    house: string;
    car: string;
    debt: string; 
    payChecks: string;
    bituahLeumi: string;
    bankAccount: string; 
    creditCard: string;
    copyId: string;
    rentContract: string; 


    public constructor(init?: Partial< Family >) {
        Object.assign(this, init);}

    deserialize(input: any): this {
        Object.assign(this, input);
        return this; }  
}
