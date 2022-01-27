import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  url: string = '/sample-project';
  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }
  downloadUrl="{{this.url}}/downloadFile"

  downloadFile(data: any) {
    return this.http.post(this.url + '/downloadDoc', data);
  }
}
