
import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { OrdersService } from '../services/orders.service';
import { OrderType } from '../models/OrderType';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-view-orders-types',
  templateUrl: './view-orders-types.component.html',
  styleUrls: ['./view-orders-types.component.css']
})
export class ViewOrdersTypesComponent implements OnInit {
  
  allTypes: any = [];
  selectedType: OrderType = new OrderType();
  // selectedSupplier: Supplier = new Supplier;
  orderInsert: any;
  messageServer: string = "";

  constructor(private _ordersService:OrdersService, private _supplierService: SupplierService, private router: Router,
    private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef){}
  
  ngOnInit() {
    this.getAllTypes();
    this.selectedType.supplier = new Supplier;
  }
  GetOrdersByType(type: OrderType) {
    console.log('get orders called');
    let navigationExtras: NavigationExtras = {
            queryParams: {
                "type": type.order_type_id
            }
        };
        console.log(navigationExtras.queryParams.type);
    this.router.navigate(['/view-orders-type'], navigationExtras);
  }
  EditType(type: OrderType) {
    console.log('edit called');
    let navigationExtras: NavigationExtras = {
            queryParams: {
                "type": type.order_type_id
            }
        };
        console.log(navigationExtras.queryParams.type);
    this.router.navigate(['/edit-type'], navigationExtras);
  }

  trackByFn(index, item) {
    return index; // or item.id
  }
  deleteType(id:number){
    this._ordersService.deleteOrderType(id).subscribe((data: {}) => {
      console.log(data);
      this.getAllTypes();
     });
   }
 

  getAllTypes(){
    this._ordersService.getAllTypes().subscribe((data: {}) => {
      console.log(data[0].order_type_name);
       this.allTypes = data;
       this.changeDetectorRefs.detectChanges();
     });
     console.log(this.allTypes);
  }
  GetTypeData(id: number){  
    this.allTypes.forEach(element => {
      if(element.order_type_id == id){
        this.selectedType = new OrderType(element);
      }
    });
    console.log("selected type: "+ this.selectedType);
  }
  addOrder(){
    var today = new Date();
    this.orderInsert ={
      order_id: 0,
      order_type: this.selectedType,
      received: false
    };
    console.log("befor Insert: "+ this.orderInsert);
    //or:Order = new Order(0,this.selectedType,Date.now,null);
    this._ordersService.insertOrder(this.orderInsert)
    .subscribe((res) => {
      if(res.SuccesMsg == -1){
        this.messageServer = "ביצוע הזמנה מסוג זה נכשל";
      }
      else{
        this.messageServer = "ההזמנה נקלטה בהצלחה";
      }
      document.getElementById("OpenAnswer").click();
        console.log("Is Success: "+res);
   });
  }


}