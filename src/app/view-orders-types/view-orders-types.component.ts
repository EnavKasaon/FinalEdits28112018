
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { OrdersService } from '../services/orders.service';
import { OrderType } from '../models/OrderType';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';

@Component({
  selector: 'app-view-orders-types',
  templateUrl: './view-orders-types.component.html',
  styleUrls: ['./view-orders-types.component.css']
})
export class ViewOrdersTypesComponent implements OnInit {
  
  allTypes: any = [];
  selectedType: OrderType = new OrderType;
  selectedSupplier: Supplier = new Supplier;
  orderInsert: any;

  constructor(private _ordersService:OrdersService, private _supplierService: SupplierService){}
  
  ngOnInit() {
    this.getAllTypes();
    
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
  getAllTypes(){
    this._ordersService.getAllTypes().subscribe((data: {}) => {
      console.log(data[0].order_type_name);
       this.allTypes = data;
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
      order_type: this.selectedType
      //order_date: new Date().
    };
    console.log("befor Insert: "+ this.orderInsert);
    //or:Order = new Order(0,this.selectedType,Date.now,null);
    this._ordersService.insertOrder(this.orderInsert)
    .subscribe((res) => {
      
        console.log("Is Success: "+res);
   });
  }


}