import { Component, OnInit, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { VolunteerService } from '../services/volunteers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  // animations: [
  //   trigger('openClose', [
  //   state('open', style({
  //     opacity: 1,
  //     backgroundColor: 'red',
  //     color: 'white'
  //   })),
  //   state('closed', style({
  //     opacity: 0.5,
  //     backgroundColor: 'white',
  //     color: 'red'
  //   })),
  //   transition('open => closed', [
  //     animate('0.2s')
  //   ]),
  //   transition('closed => open', [
  //     animate('0.2s')
  //   ]),
  // ]),
  // ]
})
export class HomeComponent implements OnInit {

  birthday: any =[];

  constructor(private _volunteerService:  VolunteerService) { }

  ngOnInit() {
    // setInterval(() => { this.toggle(); }, 500);
    // setTimeout(function () {
    //   document.getElementById('mainBtn').click();
    // }, 2500);
    this._volunteerService.getBirthdays().subscribe((data: {}) => {
       this.birthday = data;
     });
  }
  clickMethod( ) {
    if(confirm("Welcome!!!!")) {
      console.log("Implement delete functionality here");
    }
  }
  // isOpen = true;

  // toggle() {
  //   this.isOpen = !this.isOpen;
  // }
  

}
