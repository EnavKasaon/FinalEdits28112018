import { Component, OnInit, DebugElement } from '@angular/core';
import { SupplierService } from '../services/suppliers.service';
import { Supplier } from '../models/Supplier';
import { FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { OrderType } from '../models/OrderType';
import { OrdersService } from '../services/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.css']
})

export class OrderTypeComponent implements OnInit {
  public productForm: FormGroup;
  supplierDetails:any =  [];
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedSup : Supplier = new Supplier;
  alertType: string;
  alertMsg: string;
  products: Product[] = [];
  isNameExist: boolean; // check if name exist.
  orderTypeInsert: OrderType = new OrderType;
  public newSupp: Supplier = new Supplier;
  private _alertType: string;
  registerForm: FormGroup;
  submitted = false;
  form: FormGroup = new FormGroup({});

  constructor(private _supplierService:SupplierService, private fb: FormBuilder, private _ordersService:OrdersService, private formBuilder: FormBuilder) { 
    const product = [];
        product.push(this.fb.group({
            productName: [],
            amount: [],
            comments: []
        }));

        this.productForm = this.fb.group({
            details: this.fb.array( product )
        });
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  addProduct(product){
    // this.insertProduct.push(new Product({product_name:'',amount:0,comments:''}));
    this.products.push(new Product({product_name:'',amount:0,comments:''}));
    console.log(this.products[0].product_name);
  }


  ngOnInit() {
    this.orderTypeInsert.order_type_id=0;
    // this.orderTypeInsert.supplier_id = -1;
    this.supplierDetails = [];
 
    // this.registerForm = this.formBuilder.group({
    //   //    ContactPerson: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
    //   //    ContactPhone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]], 
    //   //    SupplierType: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
    //     //  companyName: ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+"), Validators.minLength(1)]], 
    //       amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], 
    //    //   Fax: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9)]],
    //    product_name:  ['', [Validators.required, Validators.pattern("^[a-z\u0590-\u05fe ]+")]]
    //     }); 


    this.products.push(new Product({product_name:'',amount:0,comments:''}));
      this._supplierService.getSupplierName().subscribe((data: {}) => {
       console.log(data[0].companyName);
        this.supplierDetails = data;
      });
     this.selectedSup.ID = -1;
     //this.selectedSup.ID = this.supplierDetails[0].ID;

      console.log(this.supplierDetails.companyName);
  }

  get f() { return this.registerForm.controls; }

/********Error Messages********* */
  NameError: string="";
  NoValue: string="שדה זה הינו שדה חובה";
  SupplierError :string ="אנא בחר ספק";
  AmountError: string="אנא בחר כמות";
  ProductError: string="אנא הכנס שם מוצר";
  NameVaild: boolean = false;


  checkProducts(){
    for(var i=0; i < this.products.length; i++) {
      if(this.products[i].product_name.length < 1 || this.products[i].amount < 1) {
        return false;
      }
    }
    return true;
  }


  checkName(){
    // let element = document.getElementById('validationName');
    this.NameError = "";
    var ans = false;
    if(this.orderTypeInsert.order_type_name == ""){
      this.NameError = this.NoValue;
      this.NameVaild = false;
      console.log(this.NameError);
    }
    else{
      this.NameVaild = true;
      this.NameError = "";
    this._ordersService.CheckIfTypeNameExist(this.orderTypeInsert.order_type_name).subscribe((data) =>{
        ans = data.SuccesMsg;
        if(ans){
          this.NameError ="שם קיים";
          console.log(this.NameError);
          this.NameVaild = false;
        }
        else{
          this.NameError = "";
          this.NameVaild = true;
        }   
       });
    }
  
  }
 


  ValidateForm (){
    let sum = 0;
    let x = document.getElementsByClassName('is-invaild');
      for (let i = 0; i < x.length; i++) {
          sum = sum+1;
      }
    
    //let my = document.getElementById('my-form');
    console.log("items *"+sum);
    
    if(document.getElementsByClassName("is-invaild")[0] !== undefined){
      //this.insertOrderType();
      return true;
    }
    return false;
  }
  



  onChange(supplierId) {
    this.stopLoading = true;
    console.log(supplierId);
    this._supplierService.getSupplier(supplierId).subscribe((data: {}) => {
      this.stopLoading = false;
       this.selectedSup = new Supplier(data);
       console.log(this.selectedSup.companyName);      
    });
    this.orderTypeInsert.supplier.ID = -1;
}

removeProduct(p: Product){
  for(var i=0; i < this.products.length; i++) {
    if(this.products[i] === p) {
      this.products.splice(i, 1);
      break;
    }
  }
} 

insertOrderType(){
  // console.log("Form validation:"+this.f.form.valid);
  // if(this.f.form.valid ){
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.orderTypeInsert));
  // }
  this.orderTypeInsert.products = this.products;
  this.orderTypeInsert.supplier= this.selectedSup;
  console.log(this.orderTypeInsert);
  this.stopLoading = true;
    this._ordersService.insertOrderType(this.orderTypeInsert)
    .subscribe((res) => {
      this.ansFromServer = res.SuccesMsg;
      this.stopLoading = false;
      // if(this.ansFromServer != -1 && !this.registerForm.invalid){
        if(this.ansFromServer != -1){
        this.alertType = "success";
        this.alertMsg ="סוג ההזמנה הוזן בהצלחה!"; 
      } 
      else{
        this.alertType = "danger";
        this.alertMsg ="הוספת סוג ההזמנה נכשלה.";
      }
        console.log(this.ansFromServer);
 });
}

  

}
