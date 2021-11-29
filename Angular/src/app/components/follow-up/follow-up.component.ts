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

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) { }

  ngOnInit(): void {
    this.getAllJobApps();
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
