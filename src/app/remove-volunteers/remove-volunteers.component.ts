import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
 
@Component({
  selector: 'app-remove-volunteers',
  templateUrl: './remove-volunteers.component.html',
  styleUrls: ['./remove-volunteers.component.css']
})
export class RemoveVolunteersComponent implements OnInit {

  volunteerDetails:any =  []; 
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedVolunteer: number;
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

  }

  // Delete volunteer
  DeleteVolunteer(form){
    console.log("Trying to delete volunteer...");
    console.log(this.selectedVolunteer);
    this.stopLoading = true;
    this._volunteerService.deleteVolunteer(this.selectedVolunteer)
    .subscribe((result)=>{
      this.ansFromServer = result;
      this.stopLoading = false;
      if(this.ansFromServer != -1){
        this.alertType = "success";
        this.alertMsg ="המתנדב נמחק בהצלחה!";
      } 
      else {
        this.alertType = "danger";
        this.alertMsg ="מחיקת המתנדב נכשלה.";
      }
        console.log(this.ansFromServer);
 }); 
  }
}
