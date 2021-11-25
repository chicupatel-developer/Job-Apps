import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrls: ['./apply-to-job.component.css']
})
export class ApplyToJobComponent implements OnInit {

  breakpoint = 0;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : (window.innerWidth <= 1000 && window.innerWidth >= 501) ? 3 :  6;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 500) ? 1 : (event.target.innerWidth <= 1000 && event.target.innerWidth >= 501) ? 3 :  6;
  }

}
