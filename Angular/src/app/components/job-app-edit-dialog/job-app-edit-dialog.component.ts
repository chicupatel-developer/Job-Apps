import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { LocalDataService } from '../../services/local-data.service';

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
  provinceCollection: any = ['MB', 'ON', 'AB'];
  cityCollection: string[] = [];

  constructor(
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
    }: any) {

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

  }

  ngOnInit(): void {  
  }


  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.form.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }
  save() {
    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
