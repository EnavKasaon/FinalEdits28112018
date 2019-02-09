import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-suppliers-report',
  templateUrl: './suppliers-report.component.html',
  styleUrls: ['./suppliers-report.component.css']
})
export class SuppliersReportComponent implements OnInit {

  allSuppliers: any = [];
  stopLoading:boolean = false;

  constructor(private _supplierService : SupplierService) { }

  ngOnInit() {
    this.stopLoading = true;
    this._supplierService.getSupplierName().subscribe((data: {}) => {
       this.allSuppliers = data;
       this.stopLoading = false;
     });
  }

}
