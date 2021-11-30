import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalDataService } from '../../services/local-data.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  jobApps = [];

  filterForm: FormGroup;
  provinceCollection: any = ['MB', 'ON', 'AB'];
  cityCollection: string[] = [];

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) { }

  ngOnInit(): void {
      this.filterForm = this.formBuilder.group({    
        city: [''],
        province: [''],
        contactPersonName: ['']
      });
    
    this.getAllJobApps();
  }
  
  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.filterForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }

  filterNow() {
   
    var filterProvince = this.filterForm.value["province"];
    var filterCity = this.filterForm.value["city"];
    var filterContactPersonName = this.filterForm.value["contactPersonName"];
    var jobApps_ = this.jobApps;
    if (this.filterForm.value["province"] != '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.province === filterProvince;
      });
    }
    if (this.filterForm.value["city"] != '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.city === filterCity;
      });
    }
    if (this.filterForm.value["contactPersonName"] != '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.contactPersonName === filterContactPersonName;
      });
    }
    this.jobApps = jobApps_;
    // console.log(jobApps_);
  }

  getAllJobApps() {
    this.dataService.getAllJobApps()
      .subscribe(
        data => {
          this.jobApps = data;
          console.log(this.jobApps);
        },
        error => {
          console.log(error);
        });
  }

}
