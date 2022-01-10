import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalDataService } from '../../services/local-data.service';
import { DataService } from 'src/app/services/data.service';

import * as moment from 'moment';

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { JobAppEditDialogComponent } from '../job-app-edit-dialog/job-app-edit-dialog.component';

import JobApplication  from '../../models/jobApplication';
import { JobAppViewDialogComponent } from '../job-app-view-dialog/job-app-view-dialog.component';
import { JobAppDeleteDialogComponent } from '../job-app-delete-dialog/job-app-delete-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import AppStatusType from 'src/app/models/appStatusType';


@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  jobApps = [];
  showSpinner = false;

  filterForm: FormGroup;
  provinceCollection: any = ['MB', 'ON', 'AB'];
  cityCollection: string[] = [];

  // app-status-types enum from api
  appStatusTypes: string[] = [];
  appStatusTypesCollection: any[] = [];

  // view job details
  jobApplication = new JobApplication();

  // resume-download
  selectedJob: any;
  // check if file exists or not
  downloadStatus: string;
  downloadClass: string;

  // FollowUpNotes
  // expansion panel
  panelOpenState = false;
 
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) { }

  ngOnInit(): void {
      this.filterForm = this.formBuilder.group({    
        city: [''],
        province: [''],
        contactPersonName: [''],
        appliedOnStart: [''],
        appliedOnEnd: ['']
      });
    
    this.getAllJobApps();
    this.getAppStatusTypes();

  }
  
  // open dialog
  // edit
  openDialog(job) {
    console.log(job);
    const dialogRef = this.dialog.open(JobAppEditDialogComponent, {
      data: {
        jobApplicationId: job.jobApplicationId,
        companyName: job.companyName,
        agencyName: job.agencyName,
        webURL: job.webURL,
        contactPersonName: job.contactPersonName,
        contactEmail: job.contactEmail,
        phoneNumber: job.phoneNumber,
        city: job.city,
        province: job.province,
        appliedOn: job.appliedOn,
        appStatus: job.appStatus,
        appStatusDisplay: this.displayAppStatusType(job.appStatus),
        followUpNotes: job.followUpNotes
      }
    });
   
    dialogRef.afterClosed().subscribe(
      data => {
        if (data === undefined)
          console.log('Edit Operation Cancelled!');
        else {
          console.log("Dialog output:", data);
          // update jobApps[] to reflect back edit
          let x = this.jobApps.find(x=>x.jobApplicationId===data.jobApplicationId);
          let index = this.jobApps.indexOf(x);
          this.jobApps[index] = data;
        }        
      }
    );
  }

  getAppStatusTypes() {
    this.dataService.getAppStatusTypes()
      .subscribe(
        data => {
          console.log(data);
          this.appStatusTypes = data;

          // appStatusTypes = data = ['Applied','FollowUp',,,]
          // appStatusTypesCollection = [{0,'Applied'},{1,'FollowUp'},,,]
          this.appStatusTypesCollection = this.localDataService.getAppStatusTypesCollection(data);          
        },
        error => {
          console.log(error);
        });
  }
  displayAppStatusType(appStatus) {
    // ip appStatus=0,1,,,
    if (this.appStatusTypes != null) {

      // returns Applied for ip appStatus==0
      // returns FollowUp for ip appStatus==1
      // ,,,
      return this.appStatusTypesCollection[appStatus].appStatus;
    }
    else {
      return 'N/A';
    }
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
    var filterAppliedOnStart = this.filterForm.value["appliedOnStart"];
    var filterAppliedOnEnd = this.filterForm.value["appliedOnEnd"];

    var filterProvince = this.filterForm.value["province"];
    var filterCity = this.filterForm.value["city"];
    var filterContactPersonName = this.filterForm.value["contactPersonName"];
    
    // var jobApps_ = this.jobApps;
    var jobApps_ = this.localDataService.getMyJobs();

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
    if (this.filterForm.value["appliedOnStart"] != '' && this.filterForm.value["appliedOnEnd"] ) {
      if (filterAppliedOnStart != null && filterAppliedOnEnd != null) {
        jobApps_ = jobApps_.filter(function (job) {
          return moment(job.appliedOn).format("YYYY-MM-DD") <= moment(filterAppliedOnEnd).format("YYYY-MM-DD")
            && moment(job.appliedOn).format("YYYY-MM-DD") >= moment(filterAppliedOnStart).format("YYYY-MM-DD");
        });
      }
    }
    this.jobApps = jobApps_;
    // console.log(jobApps_);
  }

  getAllJobApps() {
    this.showSpinner = true;
    this.dataService.getAllJobApps()
      .subscribe(
        data => {
          this.jobApps = data;
          console.log(this.jobApps);

          // store @ service to filter later on,,, 
          // no need for api call
          // no need to filter @ api
          this.localDataService.setMyJobs(data);
          
          this.showSpinner = false;
        },
        error => {
          console.log(error);
          this.showSpinner = false;
        });
  }

  // view job details
  viewJobDetails(job) {
    this.dataService.viewJobApp(Number(job.jobApplicationId))
    // this.dataService.viewJobApp('badRequest')
      .subscribe(
        data => {
          console.log(data);
          this.openDialogView(data);
        },
        error => {
          console.log(error);
          this._snackBar.open(error.status + ' : ' + error.error, '', {
            duration: 3000
          });      
        });
  }
  // open dialog
  // view
  openDialogView(job) {
    console.log(job);
    const dialogRef = this.dialog.open(JobAppViewDialogComponent, {
      width: '50%',
      minHeight: '75%',
      height: '75%',
      data: {
        jobApplicationId: job.jobApplicationId,
        companyName: job.companyName,
        agencyName: job.agencyName,
        webURL: job.webURL,
        contactPersonName: job.contactPersonName,
        contactEmail: job.contactEmail,
        phoneNumber: job.phoneNumber,
        city: job.city,
        province: job.province,
        appliedOn: job.appliedOn,
        appStatus: job.appStatus,
        appStatusDisplay: this.displayAppStatusType(job.appStatus),
        followUpNotes: job.followUpNotes
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
    
      }
    });
  }


  // delete job details
  deleteJobDetails(job) {
    console.log(job);
    this.openDialogDelete(job);
  }
  // open dialog
  // delete
  openDialogDelete(job) {
    const dialogRef = this.dialog.open(JobAppDeleteDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {     
        // api call
        // delete on api side
        console.log(job);
        this.dataService.deleteJobApp(job)
          .subscribe(
            response => {
              console.log(response);

              // delete on angular side
              this.jobApps = this.jobApps.filter(item => item.jobApplicationId !== job.jobApplicationId);

              this._snackBar.open(response.responseMessage, '', {
                duration: 3000
              });
            },
            error => {
              console.log(error);            
              this._snackBar.open(error.status + ' : ' + error.error, '', {
                duration: 3000
              });              
            }
          );
      }
    });
  }

  // resume-upload
  resumeUpload(job) {
    // store selected job for whicu user wants to upload resume, 
    // to local-data-service and,,,
    this.localDataService.setJobApp(job);

    // redirect to job-resume-upload component
    this.router.navigate(['/job-resume-upload']);
  }

  // resume-download
  resumeDownload(job) {
    this.selectedJob = job;
    console.log(job);
    this.dataService.download(job.jobApplicationId)
      .subscribe(blob => {

        // file exists and downloading
        this.setFileDownload('Downloading!', 'green');

        console.log(blob);
        // .txt
        if (blob.type === 'text/plain') {
          const myFile = new Blob([blob], { type: 'text/plain' });
          const url = window.URL.createObjectURL(myFile);
          window.open(url);
        }
        else if (blob.type === 'text/csv') {
          const myFile = new Blob([blob], { type: 'text/csv' });
          const url = window.URL.createObjectURL(myFile);
          window.open(url);
        }
        // .pdf
        else {
          // const myFile = new Blob([blob], { type: 'text/csv' });
          const myFile = new Blob([blob], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(myFile);
          window.open(url);
        }      

        setTimeout(() => {
          this.resetAfterFileDownload();
        }, 3000);

      }, error => {
        if (error.status === 400) {
          console.log('Resume Not Found on Server!');
          this.setFileDownload('Resume Not Found on Server!', 'red');
        }
        else if (error.status === 500) {
          console.log('Server Error!');
          this.setFileDownload('Server Error!', 'red');
        }
        else {       
          console.log("Error while downloading Resume!");
          this.setFileDownload('Error while downloading Resume!', 'red');
        }

        setTimeout(() => {
          this.resetAfterFileDownload();
        }, 3000);
      }
    );
  }
  resetAfterFileDownload() {
    this.downloadStatus = '';
    this.downloadClass = '';
  }
  setFileDownload(downloadStatus, downloadClass) {
    this.downloadStatus = downloadStatus;
    this.downloadClass = downloadClass;
  }
}
