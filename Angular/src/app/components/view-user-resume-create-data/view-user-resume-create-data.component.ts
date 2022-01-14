import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service'
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-user-resume-create-data',
  templateUrl: './view-user-resume-create-data.component.html',
  styleUrls: ['./view-user-resume-create-data.component.css']
})
export class ViewUserResumeCreateDataComponent implements OnInit {

  apiResponse = '';

  displayedColumns = ['userResumeCreateId', 'firstName', 'lastName', 'userIPAddress', 'resumeCreatedAt'];
  userData = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getUserResumeCreateData();
  }

  ngAfterViewInit(): void {
    this.userData.paginator = this.paginator;
    this.userData.sort = this.sort;
  }

  getUserResumeCreateData() {
    this.dataService.getUserResumeCreateData()
      .subscribe(
        data => {          
          if (data == null) {
            this.userData.data = [];
            this.apiResponse = 'User-Resume-Create Data Not Found!';
          }
          else if (data.length==0) {
            this.userData.data = [];
            this.apiResponse = 'User-Resume-Create Data is Empty!';
          }
          else {
            data.forEach((element) => {
              var ipAddress = element.userIPAddress;
              var ipAddressArray = ipAddress.split(',');
              element.userIPAddress = ipAddressArray;
            });
            this.userData.data = data;
            console.log(this.userData.data);
          }
        },
        error => {
          console.log(error);
          this.apiResponse = error.error;
        });
  }

  doFilter = (event) => {
    this.userData.filter = event.target.value.trim().toLocaleLowerCase();
  }

}
