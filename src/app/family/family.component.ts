import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {


//firstName=""
  constructor() { }

  ngOnInit() {
  }
 

 // פונקציה ללחיצה על הוסף במשפחות הנתרמות
arryForAddFamily = [];
 addFamily(myForm) {
      this.arryForAddFamily.push(myForm.value)
   
 }
}
