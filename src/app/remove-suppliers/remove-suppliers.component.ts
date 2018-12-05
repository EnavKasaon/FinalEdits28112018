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
  selectedSupplier: number;
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
    DeleteSupplier(form){
      //let id  = form.value.ID;
      console.log(this.selectedSupplier);
      this._supplierService.deleteSupplier(this.selectedSupplier)
      .subscribe((data)=>{
        this.ansFromServer = data;
        console.log("success");
        });
    } 

}
