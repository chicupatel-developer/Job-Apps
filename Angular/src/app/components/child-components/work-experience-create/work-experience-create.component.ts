import { Component, Input } from '@angular/core';
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

export class WorkExperienceCreateComponent {

  @Input() pageHeader: string | undefined;

  workExpForm: FormGroup;
 
  provinceCollection: any = ['MB', 'ON', 'AB'];
  cityCollection: string[] = [];

  submitted = false;
  workExp = new WorkExperience();
  workExps: WorkExperience[] = [];
  jobDetailsForWE: string[] = [];

  // calculate work experience duration
  startDate = '';
  endDate = '';
  duration = 0;  
  
  // edit work experience
  employerNames : string[] = [];


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

  changeProvince(e) {
    this.cityCollection = [];
    this.workExpForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }


  prepareDataForWorkExperience() {
    this.submitted = true;

    if (!this.workExpForm.valid) {
      console.log('Invalid Form!');
      return;
    }


    // check if edit or add mode
    // if woExp data found from local-storage, then it's edit
    // else add
    if (this.localDataService.getWorkExperience() != null) {
      var currentEditingEmployerName = this.workExpForm.value["employerName"];
      var foundWoExp = this.localDataService.getWorkExperience().filter(function (woExp) {
        return woExp.employerName === currentEditingEmployerName;
      });
      if (foundWoExp != null && foundWoExp.length > 0) {
        // EDIT
        var allJobDetails = this.workExpForm.value["jobDetails"].split('\n\n');
        console.log(allJobDetails);


        var workExp = {
          employerName: this.workExpForm.value["employerName"],
          city: this.workExpForm.value["city"],
          province: this.workExpForm.value["province"],
          startDate: this.workExpForm.value["startDate"],
          endDate: this.workExpForm.value["endDate"],
          // jobDetails: this.workExpForm.value["jobDetails"]
          jobDetails: this.jobDetailsForWE,
          duration: this.duration
        };
      }
      else {
        // ADD
        // prepare work experience data
        var workExp = {
          employerName: this.workExpForm.value["employerName"],
          city: this.workExpForm.value["city"],
          province: this.workExpForm.value["province"],
          startDate: this.workExpForm.value["startDate"],
          endDate: this.workExpForm.value["endDate"],
          // jobDetails: this.workExpForm.value["jobDetails"]
          jobDetails: this.jobDetailsForWE,
          duration: this.duration
        };

        if (this.workExpForm.value["endDate"] === '' || this.workExpForm.value["endDate"] === undefined)
          workExp.endDate = 'Till - Date';

        console.log(workExp);

        // reset work-experience form  
        this.workExpForm.reset();

        // save to local-data-service
        this.workExps.push(workExp);
        this.localDataService.setWorkExperience(this.workExps);

        // reset this.jobDetailsForWE[]
        this.jobDetailsForWE = [];

        // edit work experience
        this.employerNames.push(workExp.employerName);
      }
    }
    else {
      // ADD
      // prepare work experience data
      var workExp = {
        employerName: this.workExpForm.value["employerName"],
        city: this.workExpForm.value["city"],
        province: this.workExpForm.value["province"],
        startDate: this.workExpForm.value["startDate"],
        endDate: this.workExpForm.value["endDate"],
        // jobDetails: this.workExpForm.value["jobDetails"]
        jobDetails: this.jobDetailsForWE,
        duration: this.duration
      };

      if (this.workExpForm.value["endDate"] === '' || this.workExpForm.value["endDate"] === undefined)
        workExp.endDate = 'Till - Date';

      console.log(workExp);

      // reset work-experience form  
      this.workExpForm.reset();

      // save to local-data-service
      this.workExps.push(workExp);
      this.localDataService.setWorkExperience(this.workExps);

      // reset this.jobDetailsForWE[]
      this.jobDetailsForWE = [];

      // edit work experience
      this.employerNames.push(workExp.employerName);
    }
  

  
  }

  // save work-experience to workExps[] and stays to work-experience step
  // in resume - creator 
  saveAndAddMoreWorkExperience() {   
    this.prepareDataForWorkExperience();   
  }
  
  // save all work-experiences and move to next step in resume-creator
  saveWorkExperience() {  
    this.prepareDataForWorkExperience();
    
    if (this.localDataService.getWorkExperience() != undefined && this.localDataService.getWorkExperience().length > 0) {
      console.log(this.localDataService.getWorkExperience());

      // move to next step
    }
    else {
      console.log('You Have ZERO Work - Experience !');
    }
  }

  // add job-Details to work-experience
  addJobDetails() {
    if (!(this.workExpForm.value["jobDetails"] == '' || this.workExpForm.value["jobDetails"] == 'Add Job Details Here!')) {
      if (this.workExpForm.value["jobDetails"] != null) {
        this.jobDetailsForWE.push((this.workExpForm.value["jobDetails"]).trim());
        this.workExpForm.controls['jobDetails'].setValue('Add Job Details Here!');
      }     
    }    
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
      if (this.endDate==='') {
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

  editWorkExperience(emp) {
    var editingWoExp = this.localDataService.getWorkExperience().filter(function (woExp) {
      return woExp.employerName === emp;
    });

    let jobDetailsForEditingWoExp = '';
    for (let entry of editingWoExp[0].jobDetails) {
      jobDetailsForEditingWoExp = jobDetailsForEditingWoExp + entry + '\n\n';
    }

    this.workExpForm.setValue({
      employerName: editingWoExp[0].employerName,
      city: editingWoExp[0].city,
      province: editingWoExp[0].province,
      startDate: editingWoExp[0].startDate,
      endDate: editingWoExp[0].endDate,
      jobDetails: jobDetailsForEditingWoExp
    });
    this.duration = editingWoExp[0].duration;

    console.log(this.workExpForm);
  }
}
