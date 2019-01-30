import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-remove-suppliers',
  templateUrl: './remove-suppliers.component.html',
  styleUrls: ['./remove-suppliers.component.css'] 
})

export class RemoveSuppliersComponent implements OnInit {

  supplierDetails:any =  [];
  ansFromServerRemoveSup: any;
  arr: any = [];
  public stopLoading = false;
  selectedSupplier: number;
  alertType: string;
  alertMsgremovesup: string;
 
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
      console.log("Trying to delete Supplier...");
      console.log("Supplier: "+JSON.stringify(this.selectedSupplier)+" ID: ");
      this.stopLoading = true;
      this._supplierService.deleteSupplier(this.selectedSupplier)
      .subscribe((res)=>{
        this.ansFromServerRemoveSup = res.SuccesMsg;
        this.stopLoading = false;
        if(this.ansFromServerRemoveSup != -1){
          this.alertType = "success";
          this.alertMsgremovesup ="הספק נמחק בהצלחה!";
        }
        else{
          this.alertType = "danger";
          this.alertMsgremovesup ="מחיקת הספק נכשלה.";
        }
          console.log(this.ansFromServerRemoveSup);
   });
    }


}
