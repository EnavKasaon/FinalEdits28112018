import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {appSettings} from '../app.settings';


import {Supplier} from '../models/Supplier'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, map } from 'rxjs/operators';


@Injectable()
export class SupplierService {
  headers: HttpHeaders;

  sup: Supplier;
  ansFromServer: any; 

  constructor(private _http: HttpClient, private _appSettings: appSettings) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
 
 
  }

  //result: [];


  public getSupplierName(): Observable<Supplier>{  
   return this._http.get<Supplier>(`${this._appSettings.serverBaseUrl}/api/Supplier/GetAllSuppliers`);

  };

  public getSupplier (id:number): Observable<Supplier>{  
   //const body = JSON.stringify(supplier);
   // const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
   console.log("Supplier ID: "+id);
    return this._http.get<Supplier>(`${this._appSettings.serverBaseUrl}/api/Supplier/GetSupplierByID/?id=${id}`);
 
   };

  public insertSupplier(supplier:Supplier): Observable<any>{
   // supplier.SupplierType = "test";
    const body = JSON.stringify(supplier);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
   //var data = supplier; 
    
    var data = JSON.stringify(supplier);
    console.log("before sending to server ... "+data); 
   
      return this._http.post(`${this._appSettings.serverBaseUrl}/api/Supplier/Insert`, body , headerOptions);
    //  .subscribe((res) => {
    //         let result = res;
    //                    console.log(result);
    //   });

}
/*
  public getProjectLists(): Observable<Supplier>{  
    return this._http.get(`${this._appSettings.serverBaseUrl}/Projects/GetProjectsList`).map(res => res.json());     
  };

  public getBrowsersLists(): Observable<any>{  
    return this._http.get(`${this._appSettings.serverBaseUrl}/Home/GetBrosersTypes`).map(res => res.json());     
  };*/


    
}
