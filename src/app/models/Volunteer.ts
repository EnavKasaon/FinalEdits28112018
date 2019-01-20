export class Volunteer {
   
    VolunteerId: number;
    VolunteerFName	:string;
    VolunteerLName:string;
    vPhone:string;
    BirthDate:Date;
    VolunteerType: string; 
   

    public constructor(init?: Partial< Volunteer >) {
        Object.assign(this, init);  }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;  }
}
