import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { VolunteerService } from '../services/volunteers.service';

@Component({
  selector: 'app-edit-volunteers',
  templateUrl: './edit-volunteers.component.html',
  styleUrls: ['./edit-volunteers.component.css']
})

export class EditVolunteersComponent implements OnInit {

  volunteerDetails:any =  [];
  ansFromServer: any;
  arr: any = []; 
  selectedVol : Volunteer = new Volunteer;
  alertType: string;
  alertMsg: string;

  constructor(private _volunteerService:VolunteerService) { }

  ngOnInit() { 
    this.volunteerDetails = [];
    this._volunteerService.getVolunteerName().subscribe((data: {}) => {
     console.log(data[0].VolunteerFName);
      this.volunteerDetails = data;
    });
    console.log(this.volunteerDetails.VolunteerFName);
   // this.newSupp.ID= 0;
  }

      // choose the drop down
      onChange(VolunteerId) {
        console.log(VolunteerId);
        this._volunteerService.getVolunteer(VolunteerId).subscribe((data: {}) => {
           this.selectedVol = new Volunteer(data);
           console.log(this.selectedVol.VolunteerFName);      
        });
    }

      //edit
  UpdateVolunteer(){
  //  console.log("Trying to update volunteer...");
  //  console.log("Volunteer: "+JSON.stringify(this.selectedVol)+" ID: "+this.selectedVol.VolunteerId);
  console.log(this.selectedVol);

    this._volunteerService.UpdateVolunteer(this.selectedVol)
    .subscribe((data) => {
      this.ansFromServer = data;
        console.log("success");
 });
  
  }
}
