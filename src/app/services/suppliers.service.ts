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
   console.log("Supplier ID: "+id);
    return this._http.get<Supplier>(`${this._appSettings.serverBaseUrl}/api/Supplier/GetSupplierByID/?id=${id}`);
   };

   public deleteSupplier (id:number): Observable<any>{  
    console.log("Supplier ID: "+id);
     return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Supplier/Delete/?id=${id}`);
    };
 
    public UpdateSupplier(supplier:Supplier): Observable<any>{
    const body = JSON.stringify(supplier);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.put(`${this._appSettings.serverBaseUrl}/api/Supplier/Update`, body , headerOptions);
    }

    // View supplier
    public ViewSupplier(supplier:Supplier): Observable<any>{
      const body = JSON.stringify(supplier);
      const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
      return this._http.put(`${this._appSettings.serverBaseUrl}/api/Supplier/View`, body , headerOptions);
      }


  public insertSupplier(supplier:Supplier): Observable<any>{
    const body = JSON.stringify(supplier);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Supplier/Insert`, body , headerOptions);
}
  
}
