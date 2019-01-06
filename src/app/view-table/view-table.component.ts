import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/suppliers.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  suppliers: any = [];
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Supplier> = new Subject();

  constructor(private _supplierService:SupplierService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this._supplierService.getSupplierName()
      //.map(this.extractData)
      .subscribe((data: {}) => {
        this.suppliers = data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

}
