import { Component, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyService } from '../services/families.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(private _familyService: FamilyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newFam.familyId = 0;
    this.stopLoading = false;

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


  insertFamily() {
    this.submitted = true;
    console.log("Trying to insert family...");
    console.log("Family: " + JSON.stringify(this.newFam) + " ID: " + this.newFam.familyId);
    if (!this.registerForm.invalid) {
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