
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-view-orders-types',
  templateUrl: './view-orders-types.component.html',
  styleUrls: ['./view-orders-types.component.css']
})
export class ViewOrdersTypesComponent implements OnInit {
  
  constructor(){}
  
  ngOnInit() {
    
  }

  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];

}