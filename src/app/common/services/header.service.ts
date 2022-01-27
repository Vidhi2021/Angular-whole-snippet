import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../components/userdetails-model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  url: string = '/sample-project';

  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }

  userCred: User = new User();
  getUserDetails() {
    const obj = {};
    return this.http.get(this.url + '/getUserDetails', obj);
  }
}
