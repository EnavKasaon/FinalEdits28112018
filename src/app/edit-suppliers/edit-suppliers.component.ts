import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  supForm : FormGroup;
    constructor(private _supplierService:SupplierService, private fb: FormBuilder) { 
      
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
    onChange(supplierId) {
      console.log(supplierId);
      this._supplierService.getSupplier(supplierId).subscribe((data: {}) => {
        
         this.newSupp = new Supplier(data);
         console.log(this.newSupp.companyName);
       //  this.supForm = this.fb.group({
      //   typeControl: [this.supplierDetails[1]]
       // });
      });
  }
  
}
