import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  url: string = '/sample-project';
  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }

  // private baseUrl = 'http://localhost:3000';
  getFiles(): Observable<any> {
    return this.http.get(`${this.url}/data`);
  }
}
