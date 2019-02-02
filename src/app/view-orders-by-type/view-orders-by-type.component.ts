import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { OrderType } from '../models/OrderType';
import { OrdersService } from '../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { identifierModuleUrl, identifierName } from '@angular/compiler';
import { Order } from '../models/Order';
import { ExcelService } from '../services/excel.service'; 

@Component({
  selector: 'app-view-orders-by-type',
  templateUrl: './view-orders-by-type.component.html',
  styleUrls: ['./view-orders-by-type.component.css']
})
export class ViewOrdersByTypeComponent implements OnInit {
  //@Input() selected: OrderType;
  selected: any;
  allOrders:any =[];
  private sub: any;
  currentType: number;


  constructor(private _ordersService:OrdersService, private router: Router,
    private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef, private excelService:ExcelService) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      let id = params["type"];
      console.log("trying to bring data "+id);
        if(id) {
          this.currentType = id;
          this.refresh();
        }
      });
      
  }


  trackByFn(index, item) {
    return index; // or item.id
  }
 MarkReceived(order: Order){
  this._ordersService.MarkOrderReceived(order).subscribe((data: {}) => {
    console.log(data);
    this.refresh();
   });
 }
 deleteOrder(id:number){
  this._ordersService.deleteOrder(id).subscribe((data: {}) => {
    console.log(data);
    this.refresh();
   });
 }
 getOrderByID(id:number): Order{
   this.allOrders.forEach(element => {
     if(element.order_id == id){
       return new Order(element);
     }
   });
   return null;
 }
 refresh() {
  this._ordersService.GetOrdersByType(this.currentType).subscribe((res) => {
    this.allOrders = res;
    //this.teachDS = new LanguageDataSource(this.user.profile.languages.teach);
    this.changeDetectorRefs.detectChanges();
  });
}
downloadFile(data: any) {
  this.excelService.exportAsExcelFile(data, 'הזמנות');
}
  checkOrders(){
    let keys = Object.keys(this.allOrders)
    return keys;
 }
  getAllOrders(id: number){
    this._ordersService.GetOrdersByType(id).subscribe((data: {}) => {
      console.log(data[0].order_date);
       this.allOrders = data;
     });
     console.log("orders - "+this.allOrders);
  }

  
  // Prevent memory leaks
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
