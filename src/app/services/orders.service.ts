import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {appSettings} from '../app.settings';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, map } from 'rxjs/operators'; 
import { OrderType } from '../models/OrderType';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root' 
})
export class OrdersService {

  constructor(private _http: HttpClient, private _appSettings: appSettings) { }

  
  public insertOrderType(orderType:OrderType): Observable<any>{
    const body = JSON.stringify(orderType);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Orders/InsertType`, body , headerOptions);
    } 
  public insertOrder(order:Order): Observable<any>{
      const body = JSON.stringify(order);
      const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
      return this._http.post(`${this._appSettings.serverBaseUrl}/api/Orders/InsertOrder`, body , headerOptions);
   } 
   public UpdateType(order:OrderType): Observable<any>{
    const body = JSON.stringify(order);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.put(`${this._appSettings.serverBaseUrl}/api/Orders/UpdateType`, body , headerOptions);
    }

    public getAllTypes(): Observable<OrderType>{  
      return this._http.get<OrderType>(`${this._appSettings.serverBaseUrl}/api/Orders/GetAllTypes`);
     };

   public GetOrdersByType (id:number): Observable<Order>{  
    //console.log("Supplier ID: "+id);
    return this._http.get<Order>(`${this._appSettings.serverBaseUrl}/api/Orders/GetOrdersByType/?id=${id}`);
    };

   public MarkOrderReceived(order: Order): Observable<any>{
    const body = JSON.stringify(order);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.put(`${this._appSettings.serverBaseUrl}/api/Orders/MarkOrderReceived`, body , headerOptions);
 }
 public CheckIfTypeNameExist(name: string): Observable<any>{
  const body = JSON.stringify(name);
  const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  return this._http.put(`${this._appSettings.serverBaseUrl}/api/Orders/CheckIfTypeNameExists`, body , headerOptions);
}
 public deleteOrder (id:number): Observable<any>{  
  console.log("Order ID: "+id);
   return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Orders/DeleteOrder/?id=${id}`);
  }
  public deleteOrderType (id:number): Observable<any>{  
    console.log("Order Type ID: "+id);
     return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Orders/DeleteType/?id=${id}`);
    }
    public GetTypeByID (id:number): Observable<OrderType>{  
      return this._http.get<OrderType>(`${this._appSettings.serverBaseUrl}/api/Orders/GetTypeByID/?id=${id}`);
      };
}
