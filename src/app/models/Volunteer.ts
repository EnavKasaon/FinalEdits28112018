export class Volunteer {
   
    volunteerId: number;
    volunteerFName	:string;
    volunteerLName:string;
    phone:string;
    birthDate: string;
    volunteerType: string;
   

    public constructor(init?: Partial< Volunteer >) {
        Object.assign(this, init);  }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;  }
}
