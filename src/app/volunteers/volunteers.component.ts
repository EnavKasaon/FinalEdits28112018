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
  arr: any = [];
  public stopLoading = false;
  selectedVol : Volunteer = new Volunteer;
  alertType: string;
  alertMsg: string;
  
  constructor(private _volunteerService:VolunteerService) { 
    
  } 
 
  ngOnInit() {
    this.stopLoading=false;

    this.newVol.VolunteerId= 0;

  }

  insertVolunteer(){
    console.log("Trying to insert Volunteer...");
    console.log("Volunteer: "+JSON.stringify(this.newVol)+" ID: "+this.newVol.VolunteerId);
    this.stopLoading = true;
    this._volunteerService.insertVolunteer(this.newVol)
      .subscribe((res) => {
        this.ansFromServer = res;
        this.stopLoading = false;
        if(this.ansFromServer != -1){
          this.alertType = "success";
          this.alertMsg ="המתנדב הוזן בהצלחה!";
        } 
        else{
          this.alertType = "danger";
          this.alertMsg ="הוספת המתנדב נכשלה.";
        }
          console.log(this.ansFromServer);
   });
    
    }
  
  
  }