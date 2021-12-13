import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service'
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: 'app-university-winnipeg',
  templateUrl: './university-winnipeg.component.html',
  styleUrls: ['./university-winnipeg.component.css']
})
export class UniversityWinnipegComponent implements OnInit {

  displayedColumns = ['gL_Number', 'chrt_Acct_Desc', 'debit_Amount', 'credit_Amount','net_Amount'];
  uutGrpByDebitCredit_GL_Number = new MatTableDataSource<any>();

  linqStatement: 'haha';
  
  constructor(
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getUutGrpByDebitCredit_GL_Number();
  }
  
  grp_By_Debit_GLNumber = '<div>var grpByDebitGlNumber = uwContext.Uut.GroupBy(c => c.DebitGlNumber) <br /> .Select(g => new {GL_number = g.Key, Debit_Amount = g.Sum(s => s.DebitAmount), Credit_Amount = 0 });</div>';
  grp_By_Credit_GLNumber = '<div>var grpByCreditGlNumber = uwContext.Uut.GroupBy(c => c.CreditGlNumber) <br /> .Select(g => new {GL_number = g.Key, Debit_Amount = 0, Credit_Amount = g.Sum(s => s.CreditAmount)});</div>';
  grp_By_GLNumber = '<div>var grpByGL_Number = datas.GroupBy(c => c.GL_Number) <br /> .Select(g => new {GL_number = g.Key, Debit_Amount = g.Sum(s => s.Debit_Amount), Credit_Amount = g.Sum(s => s.Credit_Amount)});</div>';
  result = '<div> var result = from UUT in grpByGL_Number_Datas  <br /> join UUGA in uwContext.Uuga.ToList()  <br /> on UUT.GL_Number.Replace("-", string.Empty) equals UUGA.ChrtAcctNo.ToString() <br /> orderby UUT.GL_Number <br /> select new { <br /> GL_Number = UUT.GL_Number, <br /> Debit_Amount = UUT.Debit_Amount, <br /> Credit_Amount = UUT.Credit_Amount, <br /> Net_Amount = UUT.Debit_Amount - UUT.Credit_Amount, <br /> Chrt_Acct_Desc = UUGA.ChrtAcctDesc <br /> };</div>';


  getUutGrpByDebitCredit_GL_Number() {
    this.dataService.getUutGrpByDebitCredit_GL_Number()
      .subscribe(
        data => {
          console.log(data);
          this.uutGrpByDebitCredit_GL_Number.data = data;
        },
        error => {
          console.log(error);
        });
  }
}
