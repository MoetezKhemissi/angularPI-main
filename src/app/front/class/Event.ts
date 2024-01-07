export enum typeEvent {
    WORKSHOP = "WORKSHOP",
    PRIVATESESSION = "PRIVATESESSION",
    KEYNOTE = "KEYNOTE"
  }
  
export class Event {
    eventId: any;
    eventName: any;
    eventPrice: any;
    typeEvent:any;
    eventDescription:any;
    eventDate:any;
    eventCapacity:any;
}
