import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
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

  CalendarView = CalendarView;

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

  refresh: Subject<any> = new Subject();
  eventsFromServer: any = [];
  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'חלוקת מזון רמות רמז',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'הזנת נתוני משפחות',
    //   color: colors.blue,
    //   allDay: true
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'קבלת תרומות',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private _eventService : EventsService) {}

  loadDataFromServer(){
    
    this._eventService.loadAll().subscribe((data: {}) => {
     this.eventsFromServer = data;
     this.eventsFromServer.forEach(element => {
      this.events.push( {
        start: subDays(startOfDay(new Date(element.start_date)), 1),
        end: addDays(new Date(element.end_date), 1),
        title: element.event_desc,
        color: colors.yellow,
        actions: this.actions,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
       });

      console.log("Date format:"+new Date(element.start_date));
      });
   
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
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
  saveChanges(){
    this.events.forEach(element => {
      let event = {
        event_id: 0,
        event_desc : element.title,
        start_date : element.start,
        end_date : element.end,
        color : element.color.primary.toString()
      };
      //let e = new Event(0,,element.start, element.end,element.color.primary.toString());
      var object = {};
      object['event_id'] = "0";
      object['event_desc'] = element.title;
      object['start_date'] = element.start;
      object['end_date'] = element.end;
      object['color'] = element.color.primary.toString();

      console.log("JSON obj "+ object);
      console.log("before convert "+event);
     // let e = new Event(object);
    //   this._eventService.insertEvent( )
    // });
  });
}

}
