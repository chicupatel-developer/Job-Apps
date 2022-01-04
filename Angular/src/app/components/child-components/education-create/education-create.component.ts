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
import Education from 'src/app/models/education';

@Component({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.css']
})
export class EducationCreateComponent {

  @Input() pageHeader: string | undefined;

  educationForm: FormGroup;

  submitted = false;
  education = new Education();
  educations: Education[] = [];


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
      endDate: ['', Validators.required],
      degreeName: ['', Validators.required],
      major: ['']    
    });
  }


  prepareDataForEducation() {
    this.submitted = true;

    if (!this.educationForm.valid) {
      console.log('Invalid Form!');
      return;
    }

    // prepare education data
    var educationData = {
      universityName: this.educationForm.value["universityName"],
      country: this.educationForm.value["country"],
      startDate: this.educationForm.value["startDate"],
      endDate: this.educationForm.value["endDate"],
      degreeName: this.educationForm.value["degreeName"],
      major: this.educationForm.value["major"]
    };

    // reset education form  
    this.educationForm.reset();

    // save to local-data-service
    this.educations.push(educationData);
    this.localDataService.setEducation(this.educations);
  }

  // save education to educations[] and stays to education step
  // in resume - creator 
  saveAndAddMoreEducation() {
    this.prepareDataForEducation();
  }

  // save all educations and move to next step in resume-creator
  saveEducation() {
    this.prepareDataForEducation();

    if (this.localDataService.getEducation() != undefined && this.localDataService.getEducation().length > 0) {
      console.log(this.localDataService.getEducation());

      // move to next step
    }
    else {
      console.log('You Have ZERO Education !');
    }   
  }

}
