import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  reportName: string;
  constructor() { }

  ngOnInit() {
    this.reportName = "";
  }
  onChange(id){
    if(id == 1){
      this.reportName = "הזמנות";
    }
    if(id == 2){
      this.reportName = "משפחות";
    }
    if(id == 3){
      this.reportName = "ספקים";
    }
    if(id == 4){
      this.reportName = "מתנדבים";
    } 

  }

}
