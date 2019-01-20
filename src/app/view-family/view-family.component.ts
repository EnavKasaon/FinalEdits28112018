import { Component, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyService } from '../services/families.service';
 
@Component({
  selector: 'app-view-family',
  templateUrl: './view-family.component.html',
  styleUrls: ['./view-family.component.css']
})
export class ViewFamilyComponent implements OnInit {

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

      //view
  ViewFamily(){
    console.log(this.selectedFam);

    this._familyService.ViewFamily(this.selectedFam)
     .subscribe((data) => {
       this.ansFromServer = data;
       console.log("success");
 });
  
  }
}
