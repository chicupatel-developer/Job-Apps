import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  @Input() pageHeader: string | undefined;
  @Input() editEdu: any | undefined;

  @Output() editDoneChanged: EventEmitter<boolean> = new EventEmitter();

  educationForm: FormGroup;

  countryCollection: any = ['India', 'Canada', 'US'];

  submitted = false;

  startDate = '';
  endDate = '';

  selectedCountry = '';

  saved = false;

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

  ngOnChanges() {
    this.setFormControls()
  }

  ngOnInit(): void {
    this.setFormControls()
  }

  setFormControls() {

    this.educationForm = this.formBuilder.group({
      universityName: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      degreeName: ['', Validators.required],
      major: ['', Validators.required]
    });

    this.educationForm.setValue({
      universityName: this.editEdu.universityName,
      country: this.editEdu.country,
      startDate: this.editEdu.startDate,
      endDate: this.editEdu.endDate,
      degreeName: this.editEdu.degreeName,
      major: this.editEdu.major
    });

    this.selectedCountry = this.editEdu.country;   
  }


  editEducation() {
    this.submitted = true;

    if (!this.educationForm.valid) {
      console.log('Invalid Form!');
      return;
    }

    var currentEditingDegreeName = this.educationForm.value["degreeName"];

    var educationEdited = {
      universityName: this.educationForm.value["universityName"],
      country: this.educationForm.value["country"],
      startDate: this.educationForm.value["startDate"],
      endDate: this.educationForm.value["endDate"],
      degreeName: currentEditingDegreeName,
      major: this.educationForm.value["major"],
    };
    if (this.educationForm.value["endDate"] === '' || this.educationForm.value["endDate"] === undefined || this.educationForm.value["endDate"] === null) {
      educationEdited.endDate = '';
    }

    // reset education form  
    this.educationForm.reset();

    // save to local-data-service
    var otherEdu = this.localDataService.getEducation().filter(function (edu) {
      return edu.degreeName != currentEditingDegreeName;
    });
    otherEdu.push(educationEdited);
    this.localDataService.setEducation(otherEdu);

    this.saved = true;
    setTimeout(() => {
      this.saved = false;
      // notify parent component that edit is done
      this.editDoneChanged.emit(true);
    }, 3000);  
  }
  cancelEditEducation() {
    // notify parent component that edit is done
    this.editDoneChanged.emit(true);
  }

}
