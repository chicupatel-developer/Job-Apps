import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service'


@Component({
  selector: 'app-university-winnipeg',
  templateUrl: './university-winnipeg.component.html',
  styleUrls: ['./university-winnipeg.component.css']
})
export class UniversityWinnipegComponent implements OnInit {

  uutGrpByDebitCredit_GL_Number: [];

  constructor(
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getUutGrpByDebitCredit_GL_Number();
  }

  getUutGrpByDebitCredit_GL_Number() {
    this.dataService.getUutGrpByDebitCredit_GL_Number()
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
