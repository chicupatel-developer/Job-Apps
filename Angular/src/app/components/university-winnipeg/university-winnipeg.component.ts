import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service'
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-university-winnipeg',
  templateUrl: './university-winnipeg.component.html',
  styleUrls: ['./university-winnipeg.component.css']
})
export class UniversityWinnipegComponent implements OnInit, AfterViewInit {

  apiResponse = '';

  displayedColumns = ['gL_Number', 'chrt_Acct_Desc', 'debit_Amount', 'credit_Amount','net_Amount'];
  uutGrpByDebitCredit_GL_Number = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getUutGrpByDebitCredit_GL_Number();
  }

  ngAfterViewInit(): void {
    this.uutGrpByDebitCredit_GL_Number.paginator = this.paginator;
    this.uutGrpByDebitCredit_GL_Number.sort = this.sort;
  }
  
  grp_By_Debit_GLNumber = '<div>var <b>grpByDebitGlNumber</b> = uwContext.Uut.GroupBy(c => c.DebitGlNumber) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; .Select(g => new {GL_number = g.Key, Debit_Amount = g.Sum(s => s.DebitAmount), Credit_Amount = 0 });</div>';
  grp_By_Credit_GLNumber = '<div>var <b>grpByCreditGlNumber</b> = uwContext.Uut.GroupBy(c => c.CreditGlNumber) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; .Select(g => new {GL_number = g.Key, Debit_Amount = 0, Credit_Amount = g.Sum(s => s.CreditAmount)});</div>';
  grp_By_GLNumber = '<div>var <b>grpByGL_Number</b> = datas.GroupBy(c => c.GL_Number) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; .Select(g => new {GL_number = g.Key, Debit_Amount = g.Sum(s => s.Debit_Amount), Credit_Amount = g.Sum(s => s.Credit_Amount)});</div>';
  result = '<div> var <b>result</b> = from UUT in grpByGL_Number_Datas  <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; join UUGA in uwContext.Uuga.ToList()  <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; on UUT.GL_Number.Replace("-", string.Empty) equals UUGA.ChrtAcctNo.ToString() <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; orderby UUT.GL_Number <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; select new { <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GL_Number = UUT.GL_Number, <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Debit_Amount = UUT.Debit_Amount, <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Credit_Amount = UUT.Credit_Amount, <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Net_Amount = UUT.Debit_Amount - UUT.Credit_Amount, <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chrt_Acct_Desc = UUGA.ChrtAcctDesc <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; };</div>';


  getUutGrpByDebitCredit_GL_Number() {
    this.dataService.getUutGrpByDebitCredit_GL_Number()
      .subscribe(
        data => {
          console.log(data);
          if (data == null) {
            this.uutGrpByDebitCredit_GL_Number.data = [];
            this.apiResponse = 'Data Not Found!';
          }
          else
            this.uutGrpByDebitCredit_GL_Number.data = data;
        },
        error => {
          console.log(error);
          this.apiResponse = error.error;
        });
  }

  doFilter = (event) => {
    this.uutGrpByDebitCredit_GL_Number.filter = event.target.value.trim().toLocaleLowerCase();
  }

}
