import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service'; 
import { SupplierService } from '../services/suppliers.service';
import { FamilyService } from '../services/families.service';
import { VolunteerService } from '../services/volunteers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  supplierDetails:any =  [];
  familyDetails:any =  [];
  volunteerDetails:any =  [];


  constructor(private _supplierService:SupplierService, 
    private excelService:ExcelService,
    private _familyService:FamilyService,
    private _volunteerService:VolunteerService) { }


  ngOnInit() {

    // Supplier details
    this.supplierDetails = [];
    this._supplierService.getSupplierName().subscribe((data: {}) => {
     console.log(data[0].companyName);
      this.supplierDetails = data;
    }); console.log(this.supplierDetails.companyName);

    // Family details
    this.familyDetails = [];
    this._familyService.getFamilyName().subscribe((data: {}) => {
     console.log(data[0].firstName);
      this.familyDetails = data;
    }); console.log(this.familyDetails.firstName);

    //Volunteers details
    this.volunteerDetails = [];
    this._volunteerService.getVolunteerName().subscribe((data: {}) => {
     console.log(data[0].VolunteerFName);
      this.volunteerDetails = data;
    });
    console.log(this.volunteerDetails.VolunteerFName);
  }



  // Supplier Excel
  downloadFileSupplier(data: any) {
    this.excelService.exportAsExcelFile(data, 'ספקים');
  }
  
  ConvertToCSVSupplier(objArray: any): string {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";
  
    for (var index in objArray[0]) {
        row += index + ',';}   //Now convert each value to string and comma-separated
    row = row.slice(0, -1);
    str += row + '\r\n';   //append Label row with line break
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];  }
        str += line + '\r\n';  }
    return str;
  }
    

  // Family Excel
  downloadFileFamily(data: any) {
    this.excelService.exportAsExcelFile(data, 'משפחות');
  }
  
  ConvertToCSVFamily(objArray: any): string {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";
  
    for (var index in objArray[0]) {
        row += index + ',';} //Now convert each value to string and comma-separated
    row = row.slice(0, -1);
    str += row + '\r\n';   //append Label row with line break 
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index]; }
        str += line + '\r\n'; }
    return str; }


    //Volunteer Excel
    downloadFileVilunteers(data: any) {
      this.excelService.exportAsExcelFile(data, 'מתנדבים');
    }
    
    ConvertToCSVvolunteers(objArray: any): string {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
      var row = "";
    
      for (var index in objArray[0]) {
          row += index + ','; } //Now convert each value to string and comma-separated
      row = row.slice(0, -1);
      str += row + '\r\n'; //append Label row with line break
      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','
              line += array[i][index];  }
          str += line + '\r\n'; }
      return str; }

}
