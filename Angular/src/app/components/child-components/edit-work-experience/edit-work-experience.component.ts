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
  selector: 'app-edit-work-experience',
  templateUrl: './edit-work-experience.component.html',
  styleUrls: ['./edit-work-experience.component.css']
})
export class EditWorkExperienceComponent implements OnInit {


  @Input() pageHeader: string | undefined;
  @Input() editWoExp: any | undefined;

  workExpForm: FormGroup;

  provinceCollection: any = ['MB', 'ON', 'AB'];
  cityCollection: string[] = [];

  submitted = false;
  workExp = new WorkExperience();

  // calculate work experience duration
  startDate = '';
  endDate = '';
  duration = 0;

  selectedProvince = '';
  selectedCity = '';

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    this.workExpForm = this.formBuilder.group({
      employerName: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      jobDetails: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.editWoExp);

    /*
    this.workExpForm.patchValue({
      employerName: this.editWoExp.employerName,
      province: this.editWoExp.province,
      city: this.editWoExp.city,
      startDate: this.editWoExp.startDate,
      endDate: this.editWoExp.endDate,
      jobDetails: this.editWoExp.jobDetails
    });
    */
    this.workExpForm.setValue({
      employerName: this.editWoExp.employerName,
      province: this.editWoExp.province,
      city: this.editWoExp.city,
      startDate: this.editWoExp.startDate,
      endDate: this.editWoExp.endDate,
      jobDetails: this.editWoExp.jobDetails
    });

    this.duration = this.editWoExp.duration;

    this.selectedProvince = this.editWoExp.province;
    var cities = this.localDataService.getCities(this.selectedProvince);
    this.cityCollection = cities;
    this.selectedCity = this.editWoExp.city;
  }

  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.workExpForm.controls['city'].setValue('');

    if (e.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.value);
      this.cityCollection = cities;
    }
  }

  editWorkExperience() {
    console.log('edit wo - exp');
  }

  // get duration from endDate and startDate  
  onBlurEvent_EndDate(event) {
    if (this.workExpForm.value["startDate"] != null) {
      this.endDate = event.target.value;
      this.startDate = this.workExpForm.value["startDate"];
      console.log(this.startDate + ' --> ' + this.endDate);

      var Difference_In_Days = 0;
      if (this.endDate === '') {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date();
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('blur if ... duration : ' + Difference_In_Days);
      }
      else {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date(this.endDate);
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('blur else ... duration : ' + Difference_In_Days);
      }
      this.duration = Difference_In_Days;
    }
    else
      this.duration = 0;
  }
  changeEvent_EndDate(event) {
    if (this.workExpForm.value["startDate"] != null) {
      this.endDate = event.target.value;
      this.startDate = this.workExpForm.value["startDate"];
      console.log(this.startDate + ' --> ' + this.endDate);

      var Difference_In_Days = 0;
      if (this.endDate === null) {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date();
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('change if ... duration : ' + Difference_In_Days);
      }
      else {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date(this.endDate);
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('change else ... duration : ' + Difference_In_Days);
      }
      this.duration = Difference_In_Days;
    }
    else
      this.duration = 0;
  }
  changeEvent_StartDate(event) {
    if (event.target.value != null) {
      this.endDate = this.workExpForm.value["endDate"];
      this.startDate = event.target.value;
      console.log(this.startDate + ' --> ' + this.endDate);

      var Difference_In_Days = 0;
      if (this.endDate === '') {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date();
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('change if ...startDate... duration : ' + Difference_In_Days);
      }
      else {
        if (this.endDate === null) {
          var eventStartTime = new Date(this.startDate);
          var eventEndTime = new Date();
          var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
          Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
          console.log('change else-if ...startDate... duration : ' + Difference_In_Days);
        }
        else {
          var eventStartTime = new Date(this.startDate);
          var eventEndTime = new Date(this.endDate);
          var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
          Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
          console.log('change else-else ...startDate... duration : ' + Difference_In_Days);
        }
      }
      this.duration = Difference_In_Days;
    }
    else
      this.duration = 0;
  }
}
