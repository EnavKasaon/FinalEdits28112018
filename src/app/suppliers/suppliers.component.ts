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

  supplierDetails: any = [];
  public newSupp: Supplier = new Supplier;
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedSup: Supplier = new Supplier;
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
  form: FormGroup = new FormGroup({});

  constructor(private _supplierService: SupplierService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.stopLoading = false;

    this.newSupp.ID = 0;
    this.registerForm = this.formBuilder.group({
      ContactPerson: ['', [Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      ContactPhone: ['', [ Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(30)]],
      SupplierType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      companyName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]],
      Phone: ['', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(30)]],
      Fax: ['', [ Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      GoodsType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]]
    });
  }

  get f() { return this.registerForm.controls; }

  insertSupplier() {
    this.submitted = true;
    console.log("Trying to insert Supplier...");
    console.log("Supplier: " + JSON.stringify(this.newSupp) + " ID: " + this.newSupp.ID);
    if (!this.registerForm.invalid) {
      this.stopLoading = true;
      this.newSupp = <Supplier>this.registerForm.value;
      this._supplierService.insertSupplier(this.newSupp)
        .subscribe((res) => {
          this.ansFromServer = res.SuccesMsg;
          this.stopLoading = false;
          if (this.ansFromServer != -1) {
            this.alertType = "success";
            this.alertMsg = "הספק הוזן בהצלחה!";
          }
          else {
            this.alertType = "danger";
            this.alertMsg = "הוספת הספק נכשלה.";
          }
          console.log(this.ansFromServer);
        });
    }
    else {
      this.alertType = "danger";
      this.alertMsg = "הוספת הספק נכשלה.";
    }
  }
}

