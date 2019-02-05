import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { VolunteerService } from '../services/volunteers.service';
import { NgxLoadingModule } from 'ngx-loading';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-volunteers',
  templateUrl: './edit-volunteers.component.html',
  styleUrls: ['./edit-volunteers.component.css']
})

export class EditVolunteersComponent implements OnInit {

  volunteerDetails: any = [];
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedVol: Volunteer = new Volunteer;
  alertType: string;
  alertMsg: string;
  public newVol: Volunteer = new Volunteer;
  registerForm: FormGroup;
  submitted = false;
  form: FormGroup = new FormGroup({});

  constructor(private _volunteerService: VolunteerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.volunteerDetails = [];
    this._volunteerService.getVolunteerName().subscribe((data: {}) => {
      console.log(data[0].VolunteerFName);
      this.volunteerDetails = data;
    });
    console.log(this.volunteerDetails.VolunteerFName);
    this.stopLoading = false;

    // this.newVol.VolunteerId = 0;
    this.registerForm = this.formBuilder.group({
      VolunteerLName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      VolunteerType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      VolunteerFName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      vPhone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      BirthDate: []
    });
  }


  get f() { return this.registerForm.controls; }

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


  //edit
  UpdateVolunteer() {
    this.submitted = true;
    console.log("Trying to update volunteer...");
    console.log("Volunteer: " + JSON.stringify(this.selectedVol) + " ID: " + this.selectedVol.VolunteerId);
    console.log(this.selectedVol);
    if (!this.registerForm.invalid) {
      this._volunteerService.UpdateVolunteer(this.selectedVol)
        .subscribe((result) => {
          this.ansFromServer = result.SuccesMsg;
          if (this.ansFromServer != -1 && !this.registerForm.invalid) {
            this.alertType = "success";
            this.alertMsg = "המתנדב עודכן בהצלחה!";
          }
          else {
            this.alertType = "danger";
            this.alertMsg = "עדכון המתנדב נכשל.";
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