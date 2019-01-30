import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../services/families.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-remove-family',
  templateUrl: './remove-family.component.html',
  styleUrls: ['./remove-family.component.css']
})
export class RemoveFamilyComponent implements OnInit {

  familyDetails:any =  [];
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedFamily: number;
  alertType: string;
  alertMsg: string;

  constructor(private _familyService:FamilyService) { }

  ngOnInit() { 
    this.familyDetails = [];
    this._familyService.getFamilyName().subscribe((data: {}) => {
     console.log(data[0].firstName);
      this.familyDetails = data;
    });
    console.log(this.familyDetails.firstName);
  }

    // Delete family
    DeleteFamily(form){
      console.log(this.selectedFamily);
      this.stopLoading = true;
      this._familyService.deleteFamily(this.selectedFamily)
      .subscribe((result)=>{
        this.ansFromServer = result.SuccesMsg;
        this.stopLoading = false;
        if(this.ansFromServer != -1){
          this.alertType = "success";
          this.alertMsg ="המשפחה נמחקה בהצלחה!";
        } 
        else {
          this.alertType = "danger";
          this.alertMsg ="מחיקת המשפחה נכשלה.";
        }
          console.log(this.ansFromServer);
   }); 
    }
  }
  