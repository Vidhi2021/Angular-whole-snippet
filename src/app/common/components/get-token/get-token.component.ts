import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-get-token',
  templateUrl: './get-token.component.html',
  styleUrls: ['./get-token.component.scss'],
})
export class GetTokenComponent implements OnInit {
  errorShow: boolean = false;
  temprole: any;
  userId:any;
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Login Service: ');

    //if(navigator.cookieEnabled == true){
    console.log('Inside test');
    this.cookieService.deleteAll();

    this.loginService.getUserDetails().subscribe(
      (data: any) => {
        if (data != null) {
          console.log(data)
          this.temprole = data['roleName'];
          this.userId=data['roleId'];
          console.log(this.userId)
          this.setCookies(
            data['emailId'],
            data['roleName'],
            data['fullName'],
            data["roleId"],
          );
          console.log(this.cookieService.get('user_role'));
          console.log(this.temprole);
          if (this.cookieService.get('user_role') != this.temprole) {
            console.log('camehere');
            this.router.navigate(['']);
          }
          if (
            data['roleName'].toLowerCase() == 'admin' ||
            data['roleName'].toLowerCase() == 'procurement manager' ||
            data['roleName'].toLowerCase() == 'business owner' ||
            data['roleName'].toLowerCase() == 'ra team' ||
            data['roleName'].toLowerCase() == 'qa team' ||
            data['roleName'].toLowerCase() == 'vendor'
          ) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['invalidUser']);
          }
        } else {
          //window.location.href = 'https://uatportal.neotel.co.za/Register';
          //this.router.navigate(["/Register"]);
          this.router.navigate(['invalidUser']);
        }
      },
      (err) => {
        window.location.reload();
      }
    );
  }
  setCookies(emailId: any, roleName: any,fullName: any,roleId:any) {
    console.log('Cookie start');
    this.cookieService.set(
      'roleId',
      roleId,
      2,
      '/',
      '',
      true,
      'Lax'
    );
    this.cookieService.set(
      'user_role',
      roleName.toLowerCase(),
      2,
      '/',
      '',
      true,
      'Lax'
    );
    this.cookieService.set(
      'user_email',
      emailId.toLowerCase(),
      2,
      '/',
      '',
      true,
      'Lax'
    );
    
    this.cookieService.set(
      'display_name',
      fullName,
      2,
      '/',
      '',
      true,
      'Lax'
    );
    console.log('Cookie end');
  }
}
