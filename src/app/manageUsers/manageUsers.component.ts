import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { User } from '../models/User';

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
  selectedUser: User = new User();



  constructor(private _registerService: RegisterService,
     private changeDetectorRefs: ChangeDetectorRef,
     private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.stopLoading = true;
    this._registerService.getUserName().subscribe((data: {}) => {
       this.allUsers = data;
       this.stopLoading = false;
       this.getAllUsers();

     });
  }


  trackByFn(index, item) {
    return index; // or item.id
  }


  getAllUsers(){
    this._registerService.getAllUsers().subscribe((data: {}) => {
      console.log(data[0].userName);
       this.allUsers = data;
       this.changeDetectorRefs.detectChanges();
     });
     console.log(this.allUsers);
  }


  deleteUser(id: User){
    console.log("before deleting user: "+ id.userName );
    if(confirm("האם אתה בטוח שאתה רוצה למחוק את המשתמש?")) {
    this._registerService.deleteUser(id.userID).subscribe((data: {}) => {
      console.log(data);
      this.getAllUsers();
        // this.ansFromServer = data;
      // if (this.ansFromServer != -1 ) {
        // this.alertType = "success";
        // this.alertMsg = " המשתמש נמחק בהצלחה";
      // }
      // else {
        // this.alertType = "danger";
        // this.alertMsg = "מחיקת המשתמש נכשלה.";
      // }
      // console.log(this.ansFromServer);
     });
  }
}
}




