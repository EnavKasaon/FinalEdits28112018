import { Component, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyService } from '../services/families.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-edit-family',
  templateUrl: './edit-family.component.html',
  styleUrls: ['./edit-family.component.css']
})
export class EditFamilyComponent implements OnInit {

  familyDetails:any =  [];
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedFam : Family = new Family;
  alertType: string;
  alertMsg: string;
  public newFam: Family = new Family;
  private _alertType: string;
  registerForm: FormGroup;
  submitted = false;
  form: FormGroup = new FormGroup({});

  constructor(private _familyService:FamilyService, private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.stopLoading=false;
    this.familyDetails = [];
    this._familyService.getFamilyName().subscribe((data: {}) => {
     console.log(data[0].firstName);
      this.familyDetails = data;
    });
    console.log(this.familyDetails.firstName);
    this.stopLoading = false;
    this.newFam.familyId = 0;

    this.registerForm = this.formBuilder.group({
      joinDate: ['', Validators.required],
      familyType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      BasketType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      firstName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      street: ['', Validators.required],
      houseNum: ['', Validators.required],
      floor: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      peopleNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      notes: ['',],
      howDidYouHear: ['',],
      reasonForReferral: ['',],
      house: ['',],
      car: ['',],
      debt: ['',],
      payChecks: ['',],
      bituahLeumi: ['',],
      bankAccount: ['',],
      creditCard: ['',],
      copyId: ['',],
      rentContract: ['',]
    });
  }

  get f() { return this.registerForm.controls; }

      // choose the drop down
      onChange(FamilyId) {
        this.stopLoading = true;
        console.log(FamilyId);
        this._familyService.getFamily(FamilyId).subscribe((data: {}) => {
           this.selectedFam = new Family(data);
           this.stopLoading = false;
           console.log(this.selectedFam.firstName);      
        });
    } 

      //edit
  UpdateFamily(){
    this.submitted = true;
    console.log("Trying to update family...");
    console.log("Family: "+JSON.stringify(this.selectedFam)+" ID: "+this.selectedFam.familyId);
    if (!this.registerForm.invalid){
    this._familyService.UpdateFamily(this.selectedFam)
    .subscribe((result) => {
      this.ansFromServer = result.SuccesMsg;
      if(this.ansFromServer != -1  && !this.registerForm.invalid){
        this.alertType = "success";
        this.alertMsg ="המשפחה עודכנה בהצלחה!"; 
      }

      else{
        this.alertType = "danger";
        this.alertMsg ="עדכון המשפחה נכשל.";
      }
        console.log(this.ansFromServer);
      });
    }
    else{
      this.alertType = "danger";
      this.alertMsg ="עדכון הספק נכשל.";} 
  } 
  }