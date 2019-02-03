export class Event {
    event_id: number;
    event_desc:string;
    start_date:Date;
    end_date:Date;
    color: string;

    public constructor(init?: Partial<Event>) {
        Object.assign(this, init);
    }
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
}