import { Component, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyService } from '../services/families.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private _familyService:FamilyService) { }

  ngOnInit() { 
    this.stopLoading=false;
    this.familyDetails = [];
    this._familyService.getFamilyName().subscribe((data: {}) => {
     console.log(data[0].firstName);
      this.familyDetails = data;
    });
    console.log(this.familyDetails.firstName);
    this.stopLoading = false;
  }

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
    console.log("Trying to update family...");
    console.log("Family: "+JSON.stringify(this.selectedFam)+" ID: "+this.selectedFam.familyId);
    this.stopLoading = true;
    this._familyService.UpdateFamily(this.selectedFam)
    .subscribe((result) => {
      this.ansFromServer = result;
      this.stopLoading = false;
      if(this.ansFromServer != -1){
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
}
