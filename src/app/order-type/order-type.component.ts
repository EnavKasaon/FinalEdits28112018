import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/suppliers.service';
import { Supplier } from '../models/Supplier';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { OrderType } from '../models/OrderType';
import { OrdersService } from '../services/orders.service';


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
  orderTypeInsert: OrderType = new OrderType;

  constructor(private _supplierService:SupplierService,private fb: FormBuilder, private _ordersService:OrdersService) { 
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
    this.supplierDetails = [];
 
    this.products.push(new Product({product_name:'',amount:0,comments:''}));
      this._supplierService.getSupplierName().subscribe((data: {}) => {
       console.log(data[0].companyName);
        this.supplierDetails = data;
      });
      console.log(this.supplierDetails.companyName);
  }
  onChange(supplierId) {
    this.stopLoading = true;
    console.log(supplierId);
    this._supplierService.getSupplier(supplierId).subscribe((data: {}) => {
      this.stopLoading = false;
       this.selectedSup = new Supplier(data);
       console.log(this.selectedSup.companyName);      
    });
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
  this.orderTypeInsert.products = this.products;
  console.log(this.orderTypeInsert);
  this.stopLoading = true;
    this._ordersService.insertOrderType(this.orderTypeInsert)
    .subscribe((res) => {
      this.ansFromServer = res;
      this.stopLoading = false;
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
