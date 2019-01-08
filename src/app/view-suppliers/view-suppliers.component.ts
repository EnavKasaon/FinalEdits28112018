import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-view-suppliers',
  templateUrl: './view-suppliers.component.html',
  styleUrls: ['./view-suppliers.component.css']
})

export class ViewSuppliersComponent implements OnInit {

  public stopLoading = false;
  supplierDetails:any =  [];
  ansFromServer: any;
  arr: any = [];
  selectedSup : Supplier = new Supplier;
  alertType: string;
  alertMsg: string;
  
    constructor(private _supplierService:SupplierService) { 
      
    }
   
    // kind of constructor
    ngOnInit() {
      this.stopLoading = false;
      this.supplierDetails = [];
      this._supplierService.getSupplierName().subscribe((data: {}) => {
       console.log(data[0].companyName);
        this.supplierDetails = data;
      });
      console.log(this.supplierDetails.companyName);
     // this.newSupp.ID= 0;
    }

    // choose the drop down
    onChange(supplierId) {
      this.stopLoading = true;
      console.log(supplierId);
      this._supplierService.getSupplier(supplierId).subscribe((data: {}) => {
        this.stopLoading = false;
         this.selectedSup = new Supplier(data);
         console.log(this.selectedSup.companyName);      
      });
  }

  //View
  ViewSupplier(){
    
    //console.log("Trying to view Supplier...");
   // console.log("Supplier: "+JSON.stringify(this.selectedSup)+" ID: "+this.selectedSup.ID);
   console.log(this.selectedSup);

   this._supplierService.ViewSupplier(this.selectedSup)
    .subscribe((data) => {
      
      this.ansFromServer = data;
      console.log("success");
 });
  
  }
//   downloadFile(data: any) {
//     var csvData = this.ConvertToCSV(this.supplierDetails);
//     var blob = new Blob([csvData], { type: 'text/csv' });
//     var url = window.URL.createObjectURL(blob);
  
//     if(navigator.msSaveOrOpenBlob) {
//       navigator.msSaveBlob(blob, "suppliers");
//     } else {
//       var a = document.createElement("a");
//       a.href = url;
//       a.download = 'ETPHoldReview.csv';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     }
//     window.URL.revokeObjectURL(url);
// }

downloadFile(data: any) {
  const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
  const header = Object.keys(data[0]);
  let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');

  var a = document.createElement('a');
  var blob = new Blob([csvArray], {type: 'text/csv' }),
  url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = "AllSuppliers.csv";
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
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
