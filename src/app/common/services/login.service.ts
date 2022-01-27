import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = "/sample-project";

  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = "/sample-project";
    else this.url = 'http://localhost:3000';
  }

  logoutUser() {
    return this.http.get(this.url + '/logOut');
  }

  getUserDetails() {
    return this.http.get(this.url + '/getUserDetails');
  }
}
