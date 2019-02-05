import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef 
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
//import 'angular-calendar/dist/css/angular-calendar.css';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventsService } from '../services/events.service';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-home-page.component.html',
  host: {'window:beforeunload':'saveChanges()'}
 // styleUrls: ['./calendar-home-page.component.css']
})
export class AngularCalendarComponent {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  //view = CalendarView

  CalendarView = CalendarView;
  vis: boolean = false;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  volName: string = "יעקב";
  refresh: Subject<any> = new Subject();
  eventsFromServer: any = [];
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private _eventService : EventsService, private changeDetectorRefs: ChangeDetectorRef) {}

  loadDataFromServer(){
    this.events = [];
    this._eventService.loadAll().subscribe((data: {}) => {
     this.eventsFromServer = data;
     this.eventsFromServer.forEach(element => {
       if(element.color == "red"){ //birthday case
        this.events.push( {
          start: subDays(startOfDay(new Date(element.start_date)), 0),
          end: addDays(new Date(element.end_date), 0),
          title: element.event_desc,
          color: colors.red,
          cssClass: 'Birthday',
         allDay: true,
         meta:{
           id: 0,
           isBirthday: true
         }
         });
       }
       else{
      this.events.push( {
        start: subDays(startOfDay(new Date(element.start_date)), 0),
        end: addDays(new Date(element.end_date), 0),
        title: element.event_desc,
        color: colors.yellow,
        
       meta:{
        id: element.event_id,
        isBirthday: false
      },
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
       });
      }

      // console.log("Date format:"+new Date(element.start_date));
      });
      this.changeDetectorRefs.detectChanges();
      this.refresh.next();
     });
  
   }

   

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  ngOnInit(){
    this.loadDataFromServer();
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      meta: {
        id: 0,
        isBirthday: false
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  DeleteEvent(id, index): void {
    if(id == 0){
      this.events.splice(index, 1);
      this.refresh.next();
    }
    else{
    console.log("Before delete ID:"+id);
    this._eventService.deleteEvent(id).subscribe((data) => {
      this.loadDataFromServer();
      console.log(data);
    });
    }
  }

  UpdateOrInsert(event){
    console.log(event.event_id);
    if(event.event_id == 0){
      // insert
      this._eventService.insertEvent(event).subscribe((data) => {
        this.loadDataFromServer();
        console.log(data);
      });
    }
    else{
      // update
      this._eventService.UpdateEvent(event).subscribe((data) =>{
        console.log(data);
        this.loadDataFromServer();
      })
      
    }
  }




  saveChanges(element){
    console.log("inside of SAVE");
      let event = {
        event_id: element.meta.id,
        event_desc : element.title,
        start_date : element.start,
        end_date : element.end,
        color : element.color.primary.toString()
      }; 
      console.log("before convert "+event);
      this.UpdateOrInsert(event);
  }

}
