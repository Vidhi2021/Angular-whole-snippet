import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url: string = '/sample-project';
  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }

 
  getRecentEvents(obj: Object): Observable<any> {
    return this.http.post(this.url + '/getRecentEvents', obj);
  }
  getEventsByFilter(obj: Object): Observable<any> {
    return this.http.post(this.url + '/getEventsByFilter', obj);
  }
  getCardDetails(obj: Object) {
    return this.http.post(this.url + '/getCardDetails', obj);
  }
  getBestPerformingVendors(obj: Object) {
    return this.http.post(this.url + '/getBestPerformingVendorDetails', obj);
  }

  getDoughnutChartDetails(obj: Object) {
    return this.http.post(this.url + '/getDoughnutChartDetails', obj);
  }
}
