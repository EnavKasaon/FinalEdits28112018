import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { Router } from '@angular/router';
import { FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }

  addFiles(){

  }

}
