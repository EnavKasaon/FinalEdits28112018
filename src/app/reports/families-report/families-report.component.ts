import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/families.service';

@Component({
  selector: 'app-families-report',
  templateUrl: './families-report.component.html',
  styleUrls: ['./families-report.component.css']
})
export class FamiliesReportComponent implements OnInit {

  familyDetails:any =  [];
  stopLoading:boolean = false;

  constructor(private _familyService:FamilyService) { }

  ngOnInit() {
    this.stopLoading = true;
    this._familyService.getFamilyName().subscribe((data: {}) => {
      console.log(data[0].firstName);
       this.familyDetails = data;
       this.stopLoading = false;
     });
  }

}
