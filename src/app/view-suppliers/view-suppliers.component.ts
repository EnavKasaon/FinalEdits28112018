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
      console.log(supplierId);
      this._supplierService.getSupplier(supplierId).subscribe((data: {}) => {
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
  
}
