import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  private _alertType: string;
  public get alertType(): string {
    return this._alertType;
  }
  public set alertType(value: string) {
    this._alertType = value;
  }
alertMsg: string;
registerForm: FormGroup;
submitted = false;

  constructor(private _supplierService:SupplierService, private formBuilder: FormBuilder) { 
    
  }
 
  ngOnInit() {
   this.stopLoading=false;

    this.newSupp.ID= 0;
    this.registerForm = this.formBuilder.group({
      ContactPerson: ['', Validators.required],
      ContactPhone: ['', Validators.required],
      SupplierType: ['', Validators.required],
      companyName: ['', [Validators.required]],
      Phone: ['', [Validators.required, Validators.minLength(9)]],
      Fax: ['', Validators.required],
      GoodsType: ['', Validators.required]
  });
  }

  get f() { return this.registerForm.controls; }

  insertSupplier() {
    this.submitted = true;
    console.log("Trying to insert Supplier...");
    console.log("Supplier: "+JSON.stringify(this.newSupp)+" ID: "+this.newSupp.ID);
    this.stopLoading = true;
    if (this.registerForm.invalid) {
       return;
    //  this.alertType = "danger";
      //this.alertMsg ="הוספת הספק נכשלה.";
   }
   alert('SUCCESS!! :-)')

    this._supplierService.insertSupplier(this.newSupp)
    .subscribe((res) => {
      this.ansFromServer = res;
      this.stopLoading = false;
    });
  
  }

    //  if(this.ansFromServer != -1){
    //    this.alertType = "success";
     //   this.alertMsg ="הספק הוזן בהצלחה!"; 
   //   } 
  //    else{
  //      this.alertType = "danger";
   //     this.alertMsg ="הוספת הספק נכשלה.";
   //   }
     //   console.log(this.ansFromServer);

    // stop here if form is invalid
 //   if (this.registerForm.invalid) {
  //      return;
   // }
  //  else {this.alertType = "danger";}

  //  alert('SUCCESS!! :-)')}

  insertSupplier1(){
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
