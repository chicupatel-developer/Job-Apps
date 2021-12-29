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

@Component({
  selector: 'app-save-and-view-resume',
  templateUrl: './save-and-view-resume.component.html',
  styleUrls: ['./save-and-view-resume.component.css']
})
export class SaveAndViewResumeComponent {

  @Input() pageHeader: string | undefined;

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    
  }

  saveAndViewMyResume() {

    var personalInfo = this.localDataService.getPersonalInfo();    
    var skills = this.localDataService.getSkills();
    var workExps = this.localDataService.getWorkExperience();

    if (personalInfo == null || skills == null || workExps == null) {
      console.log('Resume Data Not Found!');
      return;
    }
      
   
    var myResume = {
      personalInfo: personalInfo,
      skills: skills,
      workExperience: workExps
    };

    console.log(myResume);

    // api call
    this.dataService.createResume(myResume)
      .subscribe(
        blob => {
          console.log(blob);

          // const myFile = new Blob([blob], { type: 'text/csv' });
          const myFile = new Blob([blob], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(myFile);
          window.open(url);

        },
        error => {
          console.log(error);
        }
    );
    
  }
}

