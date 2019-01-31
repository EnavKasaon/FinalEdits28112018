import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  alertMsg: string;
  alertType: string;
  registerForm: FormGroup;
  submitted = false;
  form: FormGroup = new FormGroup({});

    constructor(private _supplierService:SupplierService, private formBuilder: FormBuilder) { 
      
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

     this.registerForm = this.formBuilder.group({
       ContactPerson: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
       ContactPhone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]], 
       SupplierType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
       companyName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
       Phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]], 
       Fax: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9)]],
       GoodsType:  ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]]
     }); 
    }

    get f() { return this.registerForm.controls; }


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
    this.submitted = true;
    console.log("Trying to update Supplier...");
    console.log("Supplier: "+JSON.stringify(this.selectedSup)+" ID: "+this.selectedSup.ID);
    this.selectedSup = <Supplier> this.registerForm.value;
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
