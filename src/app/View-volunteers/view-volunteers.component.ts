import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { VolunteerService } from '../services/volunteers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-view-volunteers',
  templateUrl: './view-volunteers.component.html',
  styleUrls: ['./view-volunteers.component.css']
})

export class ViewVolunteersComponent implements OnInit {

  volunteerDetails:any =  [];
  ansFromServer: any;
  arr: any = []; 
  public stopLoading = false;
  selectedVol : Volunteer = new Volunteer;
  alertType: string;
  alertMsg: string;

  constructor(private _volunteerService:VolunteerService) { }

  ngOnInit() { 
    this.stopLoading=false;
    this.volunteerDetails = [];
    this._volunteerService.getVolunteerName().subscribe((data: {}) => {
     console.log(data[0].VolunteerFName);
      this.volunteerDetails = data;
    });
    console.log(this.volunteerDetails.VolunteerFName);
    this.stopLoading = false;

   // this.newSupp.ID= 0;
  }

      // choose the drop down
      onChange(VolunteerId) {
        this.stopLoading = true;
        console.log(VolunteerId);
        this._volunteerService.getVolunteer(VolunteerId).subscribe((data: {}) => {
           this.selectedVol = new Volunteer(data);
           this.stopLoading = false;
           console.log(this.selectedVol.VolunteerFName);      
        });
    }

      //view
  ViewVolunteer(){
  //  console.log("Trying to update volunteer...");
  //  console.log("Volunteer: "+JSON.stringify(this.selectedVol)+" ID: "+this.selectedVol.VolunteerId);
  console.log(this.selectedVol);

    this._volunteerService.ViewVolunteer(this.selectedVol)
    .subscribe((data) => {
      this.ansFromServer = data;
        console.log("success"); 
 });
  
  }
}
