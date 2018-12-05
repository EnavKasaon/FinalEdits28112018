import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';

@Component({
  selector: 'app-edit-suppliers',
  templateUrl: './edit-suppliers.component.html',
  styleUrls: ['./edit-suppliers.component.css']
})
export class EditSuppliersComponent implements OnInit {

  supplierDetails:any =  [];
  public newSupp: Supplier = new Supplier;
  ansFromServer: any;
  arr: any = [];
    constructor(private _supplierService:SupplierService) { 
      
    }
   
    ngOnInit() {
  
      this.supplierDetails = [];
      this._supplierService.getSupplierName().subscribe((data: {}) => {
       console.log(data[0].companyName);
        this.supplierDetails = data;
      });
      console.log(this.supplierDetails.companyName);
     // this.newSupp.ID= 0;
    }
    onChange(deviceValue) {
      console.log(deviceValue);
  }
  
}
