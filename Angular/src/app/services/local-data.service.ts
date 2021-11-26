import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

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
}
