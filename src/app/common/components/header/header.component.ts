import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { HeaderService } from '../../services/header.service';
import { User } from '../userdetails-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userCred = new Subject<User>();
  user: User = new User();
  selectedTab: string = 'home';
  user_role: any;
  role: any;
  display_name: any;
  menu: any;

  constructor(
    private confirmationService: ConfirmationService,
    private cookieService: CookieService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // router.events.subscribe((event) => {
    //   // see also
    //  if(event instanceof NavigationStart)
    //  {
    //    console.log(event)
    //    console.log(event.url)
    //  }
    // });
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e);
        var latest = e.url;
        latest = latest.split('/')[1];
        console.log(latest);
        if (latest == 'updateRequest-event') latest = 'request-event';
        else if (latest == 'updateCreate-event') latest = 'create-event';
        this.menu = latest;
        this.selectedTab = this.menu;
        console.log(this.selectedTab);
      }
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params, 'Checking params on chnage');
    });

    // this.display_name = 'John Doe';
    // this.user_role = 'Procurement Manager';
    this.user_role = this.cookieService.get('user_role');
    //this.display_name = this.cookieService.get('display_name');
    console.log(this.user_role);

    this.headerService.getUserDetails().subscribe((data: any) => {
      if (data != null) {
        console.log(data);
        this.user = data;
        this.userCred.next(data);
        console.log('i was here');
        console.log(data.roleName.toLowerCase());
        this.user_role = data['roleName'];
        localStorage.setItem('user_role', this.user_role);
        this.display_name=data['fullName'];
      }
    }
    );

   
  }
  logout() {
    console.log("Inside logout")
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Logout?',
      accept: () => {
        this.cookieService.deleteAll();
        window.location.href = 'https://angular.co.za/sample-project/sso/logout';
        //Actual logic to perform a confirmation
      },
    });
  }
  highlight(current: string) {
    this.selectedTab = current;
    console.log('ahi');
  }
}
