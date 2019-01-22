import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'] 
})
export class SuppliersComponent implements OnInit {

supplierDetails:any =  [];
public newSupp: Supplier = new Supplier;
ansFromServer: any;
arr: any = [];
public stopLoading = false;
selectedSup : Supplier = new Supplier;
alertType: string;
alertMsg: string;


  constructor(private _supplierService:SupplierService) { 
    
  }
 
  ngOnInit() {
   this.stopLoading=false;

    this.newSupp.ID= 0;
  }

  insertSupplier(){
    console.log("Trying to insert Supplier...");
    console.log("Supplier: "+JSON.stringify(this.newSupp)+" ID: "+this.newSupp.ID);
    this.stopLoading = true;
    this._supplierService.insertSupplier(this.newSupp)
    .subscribe((res) => {
      this.ansFromServer = res;
      this.stopLoading = false;
      if(this.ansFromServer != -1){
        this.alertType = "success";
        this.alertMsg ="הספק הוזן בהצלחה!"; 
      } 
      else{
        this.alertType = "danger";
        this.alertMsg ="הוספת הספק נכשלה.";
      }
        console.log(this.ansFromServer);
 });
  
  }


}
