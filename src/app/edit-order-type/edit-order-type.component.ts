import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderType } from '../models/OrderType';
import { SupplierService } from '../services/suppliers.service';
import { Product } from '../models/Product';
import { Supplier } from '../models/Supplier';

@Component({
  selector: 'app-edit-order-type',
  templateUrl: './edit-order-type.component.html',
  styleUrls: ['./edit-order-type.component.css']
})
export class EditOrderTypeComponent implements OnInit {
  
  private sub: any;
  currentType: number;
  type: OrderType = new OrderType;
  supplierDetails:any =  [];
  products: Product[] = [];
  public stopLoading = false;
  selectedSup : Supplier = new Supplier;
  ansFromServer: any;
  alertType: string;
  alertMsg: string;


  constructor(private _ordersService:OrdersService, private router: Router,
    private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef, private _supplierService:SupplierService) { }

  ngOnInit() {
    // get all suppliers 
    this._supplierService.getSupplierName().subscribe((data: {}) => {
      console.log(data[0].companyName);
       this.supplierDetails = data;
     });

    this.sub = this.route.queryParams.subscribe(params => {
      let id = params["type"];
      console.log("trying to bring data "+id);
        if(id) {
          this.currentType = id;
          this.refresh();
        }
      });
  }
  refresh() {
    this._ordersService.GetTypeByID(this.currentType).subscribe((res) => {
      this.type = res;
      this.products = this.type.products; // restart products 
      this.selectedSup = this.type.supplier; //restart supplier
      this.changeDetectorRefs.detectChanges();
    });
    
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
addProduct(product){
  // this.insertProduct.push(new Product({product_name:'',amount:0,comments:''}));
  this.products.push(new Product({product_name:'',amount:0,comments:''}));
  console.log(this.products[0].product_name);
}
removeProduct(p: Product){
  for(var i=0; i < this.products.length; i++) {
    if(this.products[i] === p) {
      this.products.splice(i, 1);
      break;
    }
  }
}
updateOrderType(){
  this.type.products = this.products;
  this.type.supplier= this.selectedSup;
  console.log(this.type);
  this.stopLoading = true;
    this._ordersService.UpdateType(this.type)
    .subscribe((res) => {
      this.ansFromServer = res.SuccesMsg;
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
