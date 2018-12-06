import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { VolunteersService } from '../services/volunteers.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit {

  newVol: Volunteer = new Volunteer;
  ansFromServer: any;

  alertType: string;
  alertMsg: string;

  constructor(private _volunteerService:VolunteersService) { 
    
  }
 
  ngOnInit() {
  }

  insertVolunteer(){
    console.log("Trying to insert Supplier...");
    console.log("Supplier: "+JSON.stringify(this.newVol)+" ID: "+this.newVol.VolunteerFName);
    this._volunteerService.insertVolunteer(this.newVol)
    .subscribe((res) => {
      this.ansFromServer = res;
      if(this.ansFromServer != -1){
        this.alertType = "success";
        this.alertMsg ="!המתנדב הוזן בהצלחה";
      }
      else{
        this.alertType = "danger";
        this.alertMsg =" הזנת המתנדב נכשלה";
      }
                 console.log(this.ansFromServer);
      });
  
  }

}
