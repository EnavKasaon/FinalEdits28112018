import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-edit-suppliers',
  templateUrl: './edit-suppliers.component.html',
  styleUrls: ['./edit-suppliers.component.css']
})

export class EditSuppliersComponent implements OnInit { 

  supplierDetails:any =  [];
  ansFromServer: any;
  public stopLoading = false;
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
      this.stopLoading = false;
     // this.newSupp.ID= 0;
    }

    // choose the drop down
    onChange(supplierId) {
      this.stopLoading = true;
      console.log(supplierId);
      this._supplierService.getSupplier(supplierId).subscribe((data: {}) => {
         this.selectedSup = new Supplier(data);
         this.stopLoading = false;
         console.log(this.selectedSup.companyName);      
      });
  }

  //edit
  UpdateSupplier(){
    console.log("Trying to update Supplier...");
    console.log("Supplier: "+JSON.stringify(this.selectedSup)+" ID: "+this.selectedSup.ID);
    this._supplierService.UpdateSupplier(this.selectedSup)
    .subscribe((res) => {
      this.ansFromServer = res.SuccesMsg;
      if(this.ansFromServer != -1){
        this.alertType = "success";
        this.alertMsg ="הספק עודכן בהצלחה!";
      }
      else{
        this.alertType = "danger";
        this.alertMsg ="עדכון הספק נכשל.";
      }
        console.log(this.ansFromServer);
 });
  
  }
  
}
