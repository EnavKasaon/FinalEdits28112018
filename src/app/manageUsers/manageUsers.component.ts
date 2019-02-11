import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-manageUsers',
  templateUrl: './manageUsers.component.html',
  styleUrls: ['./manageUsers.component.css']
})
export class ManageUsersComponent implements OnInit {

  allUsers: any = [];
  stopLoading:boolean = true;
  ansFromServer: any;
  alertType: string;
  alertMsg: string;


  constructor(private _registerService: RegisterService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.stopLoading = true;
    this._registerService.getUserName().subscribe((data: {}) => {
       this.allUsers = data;
       this.stopLoading = false;
       this.getAllUsers();

     });
  }

  getAllUsers(){
    this._registerService.getAllUsers().subscribe((data: {}) => {
      console.log(data[0].userName);
       this.allUsers = data;
       this.changeDetectorRefs.detectChanges();
     });
     console.log(this.allUsers);
  }

  deleteUser(id:number){
    this._registerService.deleteUser(id).subscribe((data: {}) => {
      console.log(data);
      this.getAllUsers();
        this.ansFromServer = data;
      if (this.ansFromServer != -1 ) {
        this.alertType = "success";
        this.alertMsg = " המשתמש נמחק בהצלחה";
      }
      else {
        this.alertType = "danger";
        this.alertMsg = "מחיקת המשתמש נכשלה.";
      }
      console.log(this.ansFromServer);
    });
   }
   

}




