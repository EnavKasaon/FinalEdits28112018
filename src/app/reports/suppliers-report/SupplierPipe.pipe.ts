import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'supplier' })
export class SupplierPipe implements PipeTransform {
  transform(suppliers: any, searchText: any): any {
    if (searchText == null)
      return suppliers;
    return suppliers.filter(function (supplier) {
      return supplier.ID.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.companyName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.Phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.Fax.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.ContactPerson.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.ContactPhone.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.GoodsType.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.SupplierType.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || supplier.Address.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}
