import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';

@Component({
  selector: 'app-remove-suppliers',
  templateUrl: './remove-suppliers.component.html',
  styleUrls: ['./remove-suppliers.component.css']
})
export class RemoveSuppliersComponent implements OnInit {

  supplierDetails:any =  [];
  public newSupp: Supplier = new Supplier;
  ansFromServer: any;
 
  
    constructor(private _supplierService:SupplierService) { 
      
    }
   
    ngOnInit() {
  
      this.supplierDetails = [];
      this._supplierService.getSupplierName().subscribe((data: {}) => {
       console.log(data[0].companyName);
        this.supplierDetails = data;
      });
      console.log(this.supplierDetails.companyName);
    
    }

}
