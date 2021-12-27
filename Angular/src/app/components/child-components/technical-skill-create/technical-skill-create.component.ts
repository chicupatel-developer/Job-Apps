import { Component, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import PersonalInfo from 'src/app/models/personalInfo';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { LocalDataService } from 'src/app/services/local-data.service';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-technical-skill-create',
  templateUrl: './technical-skill-create.component.html',
  styleUrls: ['./technical-skill-create.component.css']
})
export class TechnicalSkillCreateComponent {

  @Input() pageHeader: string | undefined;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly separatorKeysCodes: number[] = [ENTER];
  skills: Skill[] = [
    { name: "C#" },
    { name: "MVC" },
    { name: "Web API" }
  ];

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {    
  }
  // prevent duplicate skill
  // add skill
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      if (!this.skills.find(t => t.name === value))
        this.skills.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }
  // remove skill
  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  // save skills to local-data-service
  saveSkills() {
    this.localDataService.setSkills(this.skills);
    console.log(this.localDataService.getSkills());
  }

}
