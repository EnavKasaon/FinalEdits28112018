import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { VolunteerService } from '../services/volunteers.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})

export class VolunteersComponent implements OnInit {

  volunteerDetails:any =  [];
  public newVol: Volunteer = new Volunteer;
  ansFromServer: any;

  alertType: string;
  alertMsg: string;
  arr: any = [];
  constructor(private _volunteerService:VolunteerService) { 
    
  }
 
  ngOnInit() {
    this.newVol.VolunteerId= 0;

  }

  insertVolunteer(){
    console.log("Trying to insert Volunteer...");
    console.log("Volunteer: "+JSON.stringify(this.newVol)+" ID: "+this.newVol.BirthDate);
    this._volunteerService.insertVolunteer(this.newVol).subscribe((res) => {
      this.ansFromServer = res;
                 console.log(this.ansFromServer);
      });
  
  }

}
