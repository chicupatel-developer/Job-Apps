import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';
import PersonalInfo from 'src/app/models/personalInfo';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
       
  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {   
   }

  ngOnInit() {      
  } 
    
}