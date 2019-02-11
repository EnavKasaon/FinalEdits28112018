import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FamilyService } from 'src/app/services/families.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Family } from 'src/app/models/Family';

@Component({
  selector: 'app-families-report',
  templateUrl: './families-report.component.html',
  styleUrls: ['./families-report.component.css']
})

export class FamiliesReportComponent implements OnInit {

  familyDetails:any =  [];
  stopLoading:boolean = false;
  filterName: string;

  constructor(private _familyService:FamilyService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.stopLoading = true;
    this._familyService.getFamilyName().subscribe((data: {}) => {
      console.log(data[0].firstName);
       this.familyDetails = data;
       this.stopLoading = false;
     });
  }
  EditFamily(type: Family) {
    console.log('edit family called');
    let navigationExtras: NavigationExtras = {
            queryParams: {
                "type": type.familyId
            }
        };
        console.log(navigationExtras.queryParams.type);
    this.router.navigate(['/edit-family'], navigationExtras);
  }
  GetBooleanStatus ( family : Family){
    if(family.payChecks && family.rentContract && family.bankAccount && family.debt && family.bituahLeumi && family.car && family.copyId && family.creditCard && family.house){
      return "כן";
    }
    else if(!family.payChecks && !family.rentContract && !family.bankAccount && !family.debt && !family.bituahLeumi && !family.car && !family.copyId && !family.creditCard && !family.house){
      return "לא";
    }
   return "חלקי";
  }

}
