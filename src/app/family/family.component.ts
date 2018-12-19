import { Component, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyService } from '../services/families.service';

@Component({
  selector: 'family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})

export class FamilyComponent implements OnInit {

 familyDetails:any =  [];
  public newFam: Family = new Family;
  ansFromServer: any;

  alertType: string;
  alertMsg: string;
  arr: any = [];

  constructor(private _familyService:FamilyService) {} 
    
    ngOnInit() {
      this.newFam.familyId= 0;
    }
  
    insertFamily(){
      console.log("Trying to insert family...");
      console.log("Family: "+JSON.stringify(this.newFam)+" ID: "+this.newFam.familyId);
      this._familyService.insertFamily(this.newFam).subscribe((res) => {
        this.ansFromServer = res;
        console.log(this.ansFromServer);
        });
    
    }
  }
