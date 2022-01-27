import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RequestedDetailsService } from '../services/event-details/requested-details.service';

@Component({
  selector: 'app-event-audit',
  templateUrl: './event-audit.component.html',
  styleUrls: ['./event-audit.component.scss'],
})
export class EventAuditComponent implements OnInit {
  user_role: any;
  selectedTab: String = '';
  isFlag: boolean = false;
  isLoading = true;
  eventId: any;
  constructor(
    private route: Router,
    private allEvent: RequestedDetailsService,
    private cookieService: CookieService
  ) {}

  statuses: any[] = [];
  events: any[] = [];
  roleId: any;
  ngOnInit(): void {
    this.user_role = localStorage.getItem('user_role');
    this.roleId = this.cookieService.get('roleId');
    this.statuses = [
      { label: 'Requested', value: 'requested' },
      { label: 'In Progress', value: 'in progress' },
      { label: 'Concluded', value: 'concluded' },
      { label: 'Not Concluded', value: 'not concluded' },
      { label: 'Closed', value: 'closed' },
    ];
    this.setData();
    //this.checkUserRole();
  }
  setData() {
    var obj = {
      roleId: this.roleId,
    };
    this.allEvent.getAllEvents(obj).subscribe((data: any) => {
      console.log('data from api', data);
      this.events = data;
      this.isLoading = false;
    });
  }
  checkUserRole() {
    if (
      this.user_role.toLowerCase() == 'business owner' ||
      this.user_role.toLowerCase() == 'procurement manager'
    ) {
      this.isFlag = true;
    } else {
      this.isFlag = false;
    }
  }
  clear(table:any) {
    table.clear();
}

  highlight(current: String) {
    this.selectedTab = current;
  }
  redirect(row: any) {
    this.route.navigate(['/event-details', row.eventId]);
    console.log(row.status);
    localStorage.setItem('status', row.status);
    localStorage.setItem('eventId', row.eventId);
    console.log('status is' + localStorage.getItem('status'));
    console.log('status is' + localStorage.getItem('eventId'));
  }
  // ngOnDestroy()
  // {
  //   localStorage.removeItem('status')
  // }
}
