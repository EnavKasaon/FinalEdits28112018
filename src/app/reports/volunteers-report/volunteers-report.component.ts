import { Component, OnInit } from '@angular/core';
import { VolunteerService } from 'src/app/services/volunteers.service';

@Component({
  selector: 'app-volunteers-report',
  templateUrl: './volunteers-report.component.html',
  styleUrls: ['./volunteers-report.component.css']
})
export class VolunteersReportComponent implements OnInit {

  
  allVolunteers: any = [];
  stopLoading:boolean = true;
  
  constructor(private _volunteerService: VolunteerService) { }

  ngOnInit() {
    this.stopLoading = true;
    this._volunteerService.getVolunteerName().subscribe((data: {}) => {
       this.allVolunteers = data;
       this.stopLoading = false;
     });
  }

}
