import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataService } from '../services/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = 'https://localhost:44301';
  public JobApplication_API = `${this.API}/api/JobApplication`;

  constructor(private http: HttpClient, public localDataService: LocalDataService) { }

  // apply-to-job
  // add jobApplication
  addJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/addJobApplication', jobAppData)
  }

  // follow-up
  // get all jobApplications
  getAllJobApps(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.JobApplication_API + '/getAllJobApps');
  }
}
