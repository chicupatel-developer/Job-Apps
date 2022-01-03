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

  // save education to local-data-service
  saveEducation() {
    this.submitted = true;

    if (!this.educationForm.valid) {
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

    // save to local-data-service
    this.education = educationData;
    this.educations.push(this.education);
    this.localDataService.setEducation(this.educations);

    console.log(this.localDataService.getEducation());
   
  }

}
