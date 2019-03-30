import { Component, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyService } from '../services/families.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';


@Component({
  selector: 'family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
 
export class FamilyComponent implements OnInit {

  familyDetails: any = [];
  public newFam: Family = new Family;
  ansFromServer: any;
  alertType: string;
  alertMsg: string;
  arr: any = [];
  public stopLoading = false;
  selectedFam: Family = new Family;
  private _alertType: string;
  registerForm: FormGroup;
  submitted = false;
  form: FormGroup = new FormGroup({});
  startDate = new Date(1950, 1, 1);
  familyType: string = "";


  constructor(private _familyService: FamilyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newFam.familyId = 0;
    this.stopLoading = false;

    this.registerForm = this.formBuilder.group({
      joinDate: ['',],
      familyType: ['', Validators.required],
      BasketType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      firstName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      street: ['', Validators.required],
      houseNum: ['', Validators.required],
      floor: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(30)]],
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


  StreetError: string="";
  StreetVaild: boolean = false;
  NoValueStreet: string="שדה זה הינו שדה חובה";
  houseNumError: string="";
  houseNumVaild: boolean = false;
  NoValueHouseNum: string="שדה זה הינו שדה חובה";
  floorError: string="";
  floordVaild: boolean = false;
  NoValueFloor: string="שדה זה הינו שדה חובה";
  err: boolean = false;

  CheckUniqueAddress(){
    this.StreetError = "";
    this.houseNumError = "";
    this.floorError = "";
    var ans = false;
    if( this.newFam.street == "" || this.newFam.houseNum == "" || this.newFam.floor == null){
      this.StreetError = this.NoValueStreet;
      this.houseNumError = this.NoValueHouseNum;
      this.floorError = this.NoValueFloor;

      this.StreetVaild = false;
      this.houseNumVaild = false;
      this.floordVaild = false;

      this.err = false; 

      console.log(this.StreetError);
      console.log(this.houseNumError);
      console.log(this.floorError);

    }
    else {
      this.StreetVaild = true;
      this.houseNumVaild = true;
      this.floordVaild = true;
      this.StreetError = "";
      this.houseNumError = "";
      this.floorError = "";

    this._familyService.CheckUniqueAddress(this.newFam ).subscribe((data) =>{
        ans = data.SuccesMsg;
        if(ans) {
          this.StreetError ="הכתובת כבר קיימת במערכת";
          console.log(this.StreetError);
          this.StreetVaild = false;
        }
        else{
          this.StreetError = "";
          this.StreetVaild = true;
        }   
       });
    }
  }



  insertFamily() {
    this.submitted = true;
    console.log("Trying to insert family...");
    console.log("Family: " + JSON.stringify(this.newFam) + " ID: " + this.newFam.familyId);
    if (!this.registerForm.invalid && this.StreetVaild==true) {
      this.stopLoading = true;
      this.newFam = <Family>this.registerForm.value;
      this._familyService.insertFamily(this.newFam).subscribe((res) => {
        this.ansFromServer = res.SuccesMsg;
        this.stopLoading = false;
        if (this.ansFromServer != -1 && !this.registerForm.invalid) {
          this.alertType = "success";
          this.alertMsg = "המשפחה נוספה בהצלחה!";
        }
        else {
          this.alertType = "danger";
          this.alertMsg = "הוספת המשפחה נכשלה.";
        }
        console.log(this.ansFromServer);
      });
    }
    else {
      this.alertType = "danger";
      this.alertMsg = "הוספת המשפחה נכשלה.";
    }
  }
} 