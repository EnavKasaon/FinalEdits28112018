import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../services/families.service';

@Component({
  selector: 'app-remove-family',
  templateUrl: './remove-family.component.html',
  styleUrls: ['./remove-family.component.css']
})
export class RemoveFamilyComponent implements OnInit {

  familyDetails:any =  [];
  selectedFamily: number;
  ansFromServer: any;

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
      this._familyService.deleteFamily(this.selectedFamily)
      .subscribe((data)=>{
        this.ansFromServer = data;
        console.log("success");
        });
    } 
}
