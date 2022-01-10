import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {


  @Input() pageHeader: string | undefined;
  @Output() degreeListChanged: EventEmitter<string> = new EventEmitter();

  educationForm: FormGroup;

  countryCollection: any = ['India', 'Canada', 'US'];

  submitted = false;
  educations: any[] = [];

  startDate = '';
  endDate = '';

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    this.educationForm = this.formBuilder.group({
      universityName: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      degreeName: ['', Validators.required],
      major: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  prepareDataForEducation() {
    this.submitted = true;

    if (!this.educationForm.valid) {
      console.log('Invalid Form!');
      return;
    }

    // prepare education data
    var education = {
      universityName: this.educationForm.value["universityName"],
      country: this.educationForm.value["country"],
      startDate: this.educationForm.value["startDate"],
      endDate: this.educationForm.value["endDate"],
      degreeName: this.educationForm.value["degreeName"],
      major: this.educationForm.value["major"]
    };

    if (this.educationForm.value["endDate"] === '' || this.educationForm.value["endDate"] === undefined || this.educationForm.value["endDate"] === null) {
      education.endDate = '';
    }

    // reset education form  
    this.educationForm.reset();

    // save to local-data-service
    var myEducations = this.localDataService.getEducation();
    this.educations = Object.assign([], myEducations);
    this.educations.push(education);
    this.localDataService.setWorkExperience(this.educations);

    // notify parent component's degreeList
    this.degreeListChanged.emit(education.degreeName);
  }



}
