import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  constructor(private _supplierService:SupplierService) { 
    
  }
 
  ngOnInit() {


    this.newSupp.ID= 0;
  }

  insertSupplier(){
    console.log("Trying to insert Supplier...");
    console.log("Supplier: "+JSON.stringify(this.newSupp)+" ID: "+this.newSupp.ID);
    this._supplierService.insertSupplier(this.newSupp)
    .subscribe((res) => {
      this.ansFromServer = res;
                 console.log(this.ansFromServer);
 });
  
  }


}
