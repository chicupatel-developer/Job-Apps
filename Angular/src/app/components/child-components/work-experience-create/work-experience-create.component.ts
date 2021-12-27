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

  // save work-experience(s) to local-data-service
  saveWorkExperience() {
    this.submitted = true;

    if (!this.workExpForm.valid) {
      console.log('Invalid Form!'); 
      return;
    }

    // prepare work experience data
    var workExp = {
      employerName: this.workExpForm.value["employerName"],
      city: this.workExpForm.value["city"],
      province: this.workExpForm.value["province"],
      startDate: this.workExpForm.value["startDate"],
      endDate: this.workExpForm.value["endDate"],
      // jobDetails: this.workExpForm.value["jobDetails"]
      jobDetails: this.jobDetailsForWE
    };

    console.log(workExp);

    // save to local-data-service
   
  }

  // add job-Details to work-experience
  addJobDetails() {
    if (!(this.workExpForm.value["jobDetails"] == '' || this.workExpForm.value["jobDetails"] == 'Add Job Details Here!' )) {
      this.jobDetailsForWE.push((this.workExpForm.value["jobDetails"]).trim());
      this.workExpForm.controls['jobDetails'].setValue('Add Job Details Here!');      
    }
    
  }
}
