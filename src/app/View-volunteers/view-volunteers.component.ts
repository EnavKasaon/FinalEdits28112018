import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { VolunteerService } from '../services/volunteers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-view-volunteers',
  templateUrl: './view-volunteers.component.html',
  styleUrls: ['./view-volunteers.component.css']
}) 

export class ViewVolunteersComponent implements OnInit {

  volunteerDetails: any = [];
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedVol: Volunteer = new Volunteer;
  alertType: string;
  alertMsg: string;

  constructor(private _volunteerService: VolunteerService, private excelService: ExcelService) { }

  ngOnInit() {
    this.stopLoading = false;
    this.volunteerDetails = [];
    this._volunteerService.getVolunteerName().subscribe((data: {}) => {
      console.log(data[0].VolunteerFName);
      this.volunteerDetails = data;
    });
    console.log(this.volunteerDetails.VolunteerFName);
    this.stopLoading = false;

    // this.newSupp.ID= 0;
  }

  // choose the drop down
  onChange(VolunteerId) {
    this.stopLoading = true;
    console.log(VolunteerId);
    this._volunteerService.getVolunteer(VolunteerId).subscribe((data: {}) => {
      this.selectedVol = new Volunteer(data);
      this.stopLoading = false;
      console.log(this.selectedVol.VolunteerFName);
    });
  }

  //view
  ViewVolunteer() {
    //  console.log("Trying to update volunteer...");
    //  console.log("Volunteer: "+JSON.stringify(this.selectedVol)+" ID: "+this.selectedVol.VolunteerId);
    console.log(this.selectedVol);

    this._volunteerService.ViewVolunteer(this.selectedVol)
      .subscribe((data) => {
        this.ansFromServer = data;
        console.log("success");
      });
  }

  downloadFile(data: any) {
    this.excelService.exportAsExcelFile(data, 'מתנדבים');
  }

  ConvertToCSV(objArray: any): string {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
