import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteers.service';

@Component({
  selector: 'app-remove-volunteers',
  templateUrl: './remove-volunteers.component.html',
  styleUrls: ['./remove-volunteers.component.css']
})
export class RemoveVolunteersComponent implements OnInit {

  volunteerDetails:any =  [];
  selectedVolunteer: number;
  ansFromServer: any;

  constructor(private _volunteerService:VolunteerService) { }

  ngOnInit() { 
    this.volunteerDetails = [];
      this._volunteerService.getVolunteerName().subscribe((data: {}) => {
       console.log(data[0].VolunteerFName);
        this.volunteerDetails = data;
      });
      console.log(this.volunteerDetails.VolunteerFName);
  }

  // Delete volunteer
  DeleteVolunteer(form){
    console.log(this.selectedVolunteer);
    this._volunteerService.deleteVolunteer(this.selectedVolunteer)
    .subscribe((data)=>{
      this.ansFromServer = data;
      console.log("success");
      });
  } 

}
