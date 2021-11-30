import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private MyJobs;

  constructor() { }
  
  setMyJobs(val) {
    this.MyJobs = val;
  }
  getMyJobs() {
    return this.MyJobs;
  }

  // return city collection as per province input
  getCities(province: string): Array<string> {
    let cities: string[] = [];

    if (province == "MB") {
      cities.push("Winnipeg");
      cities.push("Brandon");
    }
    else if (province == "ON") {
      cities.push("Toronto");
      cities.push("Missisauga");
      cities.push("Brampton");
      cities.push("London");
    }
    else if (province == "AB") {
      cities.push("Calgary");
      cities.push("Edmonton");
    }    
    return cities;
  }

  // 400
  // error handler
  display400andEx(error, componentName): string[] {
    var errors = [];
    if (error.status == 400) {
      // console.log(error.error.error[0]);
      if (error.error.error != null) {
        for (var key in error.error.error) {
          errors.push(error.error.error[key]);
        }
      } else {
        errors.push('[' + componentName + '] Data Not Found ! / Bad Request !');
      }
    }
    else {
      console.log(error);
    }
    return errors;
  }

}
