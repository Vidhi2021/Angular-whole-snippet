import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  url: string = '/sample-project';
  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }

  getAllUsers(object: Object) {
    return this.http.post(this.url + '/getAllUsersData', object);
  }
  deleteUser(object: Object) {
    return this.http.post(this.url + '/deleteRole', object);
  }
  updateData(object: Object) {
    return this.http.post(this.url + '/updateRole', object);
  }
  inviteUser(object: Object) {
    return this.http.post(this.url + '/addRole', object);
  }
  getRoles()
  {
    return this.http.get(this.url + '/getRolesAvailable')
  }
}
