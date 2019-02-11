import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'volunteer' })
export class VolunteerPipe implements PipeTransform {
  transform(volunteers: any, searchText: any): any {
    if (searchText == null)
      return volunteers;
    return volunteers.filter(function (volunteer) {
      return volunteer.VolunteerId.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || volunteer.VolunteerFName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || volunteer.VolunteerLName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || volunteer.vPhone.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || volunteer.VolunteerType.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || volunteer.IdNum.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || volunteer.BirthDate.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}
