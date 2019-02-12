import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrls: ['./orders-report.component.css']
})
export class OrdersReportComponent implements OnInit {

  allOrders: any = []; 
  stopLoading:boolean = false;
  public sel:any;

  constructor(private _orderService : OrdersService) { }

  ngOnInit() {
    this.stopLoading = true;
    this._orderService.GetAllOrders().subscribe((data: {}) => {
        this.allOrders = data;
        this.stopLoading = false;
      });
  }

  

}
