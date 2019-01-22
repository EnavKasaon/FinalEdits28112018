export class User {
   
    userID: number;
    userName:string;
    Password:string;
    Email:string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
    
}
