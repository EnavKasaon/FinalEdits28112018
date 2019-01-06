import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  clickMethod( ) {
    if(confirm("Welcome!!!!")) {
      console.log("Implement delete functionality here");
    }
  }

}
