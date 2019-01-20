export class Login {
   
    userID: number;
    userName:string;
    password:string;

    public constructor(init?: Partial<Login>) {
        Object.assign(this, init);
    }
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
    
}
