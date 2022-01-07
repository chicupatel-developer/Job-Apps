import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';
import PersonalInfo from 'src/app/models/personalInfo';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import WorkExperience from 'src/app/models/workExperience';
import * as moment from 'moment';

@Component({
  selector: 'app-work-experience-create',
  templateUrl: './work-experience-create.component.html',
  styleUrls: ['./work-experience-create.component.css']
})

export class WorkExperienceCreateComponent implements OnInit {

  @Input() pageHeader: string | undefined;
  

  editWoExp: any;

  showAdd = true;
  showEdit = false;

  // store employer's name for future edit of work-experience
  employerList: string[] = [];

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
  
  }
 
  ngOnInit(): void {
  }

  employerListChangedHandler(employerName: string) {    
    this.employerList.push(employerName);
    console.log(this.employerList);
  }

  editWorkExperience(editingEmployerName) {
    // console.log(editingEmployerName);

    this.showEdit = true;
    this.showAdd = false;

    var editingWoExp = this.localDataService.getWorkExperience().filter(function (woExp) {
      return woExp.employerName === editingEmployerName;
    });

    let jobDetailsForEditingWoExp = '';
    for (let entry of editingWoExp[0].jobDetails) {
      jobDetailsForEditingWoExp = jobDetailsForEditingWoExp + entry + '\n\n';
    }

    // console.log(editingWoExp);
    // console.log(jobDetailsForEditingWoExp);
    editingWoExp[0].jobDetails = jobDetailsForEditingWoExp;
    
    // send this editingWoExp to edit-work-experience child component
    this.editWoExp = editingWoExp[0];
  }
}
