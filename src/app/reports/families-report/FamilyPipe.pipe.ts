import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'family' })
export class FamilyPipe implements PipeTransform {
  transform(families: any, searchText: any): any {
    if (searchText == null)
      return families;
    return families.filter(function (family) {
      return family.familyId.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.firstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.street.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.houseNum.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.floor.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.phone.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.joinDate.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.familyType.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || family.basketType.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}
