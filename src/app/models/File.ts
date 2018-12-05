export class File {
   
    FileId: number;
    fileName:string;
    fullFile:string;
    
    public constructor(init?: Partial< File >) {
        Object.assign(this, init); }
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this; }   
}
