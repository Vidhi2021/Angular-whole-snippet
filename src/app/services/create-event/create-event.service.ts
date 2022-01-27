import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {
  url: string = '/sample-project';
  constructor(private http: HttpClient) { 
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }

  createEvent(object: Object) {
    return this.http.post(this.url + '/createEvent', object);
  }
  getList(object: Object) {
    return this.http.post(this.url + '/getUsersWithRole', object);
  }
}
