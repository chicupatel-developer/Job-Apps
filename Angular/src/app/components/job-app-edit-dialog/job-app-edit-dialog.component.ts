import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { LocalDataService } from '../../services/local-data.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

import JobApplication from '../../models/jobApplication';

@Component({
  selector: 'app-job-app-edit-dialog',
  templateUrl: './job-app-edit-dialog.component.html',
  styleUrls: ['./job-app-edit-dialog.component.css']
})
export class JobAppEditDialogComponent implements OnInit {
 
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  form: FormGroup;
  submitted = false;
  apiResponse = '';
  responseColor = '';
  errors: string[];

  provinceCollection: any = ['MB', 'ON', 'AB'];
  cityCollection: string[] = [];

  jobApplication = new JobApplication();
  selectedProvince = '';
  selectedCity = '';

  constructor(
    private router: Router,
    public dataService: DataService,
    public localDataService: LocalDataService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobAppEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {
      jobApplicationId,
      companyName,
      agencyName,
      webURL,
      contactPersonName,
      contactEmail,
      phoneNumber,
      city,
      province,
      appliedOn,
      appStatus,
      followUpNotes
    }: JobApplication) {

    this.form = fb.group({
      companyName: [''],
      agencyName: [''],
      webURL: [''],
      contactPersonName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: ['', [Validators.pattern(this.phoneRegx)]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      appliedOn: [''],
      appStatus: [''],
      followUpNotes: ['']
    });

    this.jobApplication.jobApplicationId = jobApplicationId;
    this.jobApplication.companyName = companyName;
    this.jobApplication.agencyName = agencyName;
    this.jobApplication.webURL = webURL;
    this.jobApplication.contactPersonName = contactPersonName;
    this.jobApplication.contactEmail = contactEmail;
    this.jobApplication.phoneNumber = phoneNumber;
    this.jobApplication.city = city;
    this.jobApplication.province = province;
    this.jobApplication.appliedOn = appliedOn;
    this.jobApplication.appStatus = appStatus;
    this.jobApplication.followUpNotes = followUpNotes;

    this.selectedProvince = province;
    var cities = this.localDataService.getCities(province);
    this.cityCollection = cities;
    this.selectedCity = city;    
  }

  ngOnInit(): void {
    
    // patch form values
    /*
    this.form.patchValue({
      companyName: this.jobApplication.companyName,
      agencyName: this.jobApplication.agencyName,
      webURL: this.jobApplication.webURL,
      contactPersonName: this.jobApplication.contactPersonName,
      contactEmail: this.jobApplication.contactEmail,
      phoneNumber: this.jobApplication.phoneNumber,
      city: this.jobApplication.city,
      province: this.jobApplication.province,
      appliedOn: this.jobApplication.appliedOn,
      appStatus: this.jobApplication.appStatus,
      followUpNotes: this.jobApplication.followUpNotes
    });
    */

    this.form.setValue({
      companyName: this.jobApplication.companyName,
      agencyName: this.jobApplication.agencyName,
      webURL: this.jobApplication.webURL,
      contactPersonName: this.jobApplication.contactPersonName,
      contactEmail: this.jobApplication.contactEmail,
      phoneNumber: this.jobApplication.phoneNumber,
      city: this.jobApplication.city,
      province: this.jobApplication.province,
      appliedOn: this.jobApplication.appliedOn,
      appStatus: this.jobApplication.appStatus,
      followUpNotes: this.jobApplication.followUpNotes
    });
   
  }


  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.form.controls['city'].setValue('');

    if (e.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.value);
      this.cityCollection = cities;
    }
  }

  save() {  
    this.submitted = true;
    
    if (!this.form.valid) {
      return;
    }
    
    // prepare object for api call
    var jobApplicationId = this.jobApplication.jobApplicationId;
    this.jobApplication = this.form.value;
    this.jobApplication.jobApplicationId = jobApplicationId;

    // api call
    this.dataService.editJobApp(this.jobApplication)
      .subscribe(
        response => {
          if (response.responseCode == 0) {
            // success    
            this.apiResponse = response.responseMessage;
            this.responseColor = 'green';

            this.form.reset();
            this.errors = [];
            this.submitted = false;

            setTimeout(() => {
              this.router.navigate(['/follow-up']);
              this.apiResponse = '';

              // close dialog
              this.dialogRef.close(this.form.value);
            }, 3000);
          }
          else {
            // server error
            this.apiResponse = response.responseCode + ' : ' + response.responseMessage;
            this.responseColor = 'red';

            this.errors = [];
          }
        },
        error => {
          this.apiResponse = '';
          this.responseColor = 'red';
          this.errors = [];

          if (error.status === 400) {
            this.apiResponse = "Bad Request!";
          }
          this.errors = this.localDataService.display400andEx(error, 'Edit-Job-App');
        }
      );    
  }

  close() {
    this.dialogRef.close();
  }

}