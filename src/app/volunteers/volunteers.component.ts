import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { VolunteerService } from '../services/volunteers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';

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
  registerForm: FormGroup; 
  submitted = false;
  form: FormGroup = new FormGroup({});
  startDate = new Date(1950, 1, 1);

 
  constructor(private _volunteerService:VolunteerService, private formBuilder: FormBuilder) { 
  } 
 
  ngOnInit() {
    this.stopLoading=false;

    this.newVol.VolunteerId= 0;
    this.registerForm = this.formBuilder.group({
      VolunteerLName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
      VolunteerType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
      VolunteerFName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
      vPhone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(30)]], 
      BirthDate: ['',],
      IdNum: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]]
    }); 
  }  

  get f() { return this.registerForm.controls; }


  insertVolunteer(){
    this.submitted = true;
    console.log("Trying to insert Volunteer...");
    console.log("Volunteer: "+JSON.stringify(this.newVol)+" ID: "+this.newVol.VolunteerId);
    if (!this.registerForm.invalid) {
    this.stopLoading = true;
    this.newVol = <Volunteer> this.registerForm.value;
    this._volunteerService.insertVolunteer(this.newVol)
      .subscribe((res) => {
        this.ansFromServer = res.SuccesMsg;
        this.stopLoading = false;
        if(this.ansFromServer != -1  && !this.registerForm.invalid){
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
   else {
    this.alertType = "danger";
    this.alertMsg = "עדכון הספק נכשל.";
  }
}
}