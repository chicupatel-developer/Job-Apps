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
  public UW_API = `${this.API}/api/UW`;

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
  // follow-up
  // get app-status-type
  getAppStatusTypes(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.JobApplication_API + '/getAppStatusTypes');
  }
  // follow-up-->job-app-view-dialog
  // view jobApplication
  viewJobApp(jobAppId): Observable<any> {
    return this.http.get<any>(this.JobApplication_API + '/viewJobApp/'+jobAppId);
  }

  // follow-up-->job-app-edit-dialog
  // edit jobApplication
  editJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/editJobApplication', jobAppData)
  }
  
  // follow-up-->job-app-delete-dialog
  // delete jobApplication
  deleteJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/deleteJobApplication', jobAppData)
  }

  // UW
  getUutGrpByDebitCredit_GL_Number(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.UW_API + '/getUUTGrp_DebitCredit_GL_Number');    
  }
}
