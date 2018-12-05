export class Package {
   
    packageId: number;
    packageName:string;
    
    
    public constructor(init?: Partial< Package >) {
        Object.assign(this, init); }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this; }   
}
