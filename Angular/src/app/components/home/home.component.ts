import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  applyToJobForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  provinceCollection: any = ['MB', 'ON', 'AB'];
  cityCollection: string[] = [];

  constructor(
    private formBuilder: FormBuilder, public localDataService: LocalDataService
  ) { }

  ngOnInit() {
    this.applyToJobForm = this.formBuilder.group({
      companyName: [null],
      agencyName: [null],
      webURL: [null],
      contactPersonName: [null, Validators.required],
      contactEmail: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: [null, [Validators.pattern(this.phoneRegx)]],
      city: [null, Validators.required],
      province: [null, Validators.required]      
    });
  }
 

  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.applyToJobForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }

  submit() {
    if (!this.applyToJobForm.valid) {
      return;
    }
    // console.log(this.applyToJobForm.value["email"]);
    // console.log(this.applyToJobForm.value["password"]);
    console.log(this.applyToJobForm.value);
  }

}