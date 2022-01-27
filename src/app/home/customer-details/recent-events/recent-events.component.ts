import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.scss'],
})
export class RecentEventsComponent implements OnInit {
  selectedTab: any;
  isLoading = true;
  constructor(private homeService: HomeService,private cookieService:CookieService) {
    
  }
  cols: any[] = ['Event_Name', 'Start_Date', 'End_Date', 'Proc_Mgr'];
  products = [];
  ngOnInit(): void {
    var roleId=this.cookieService.get('roleId');
    var obj={
      roleId:roleId
    }
    this.homeService.getRecentEvents(obj).subscribe(
      (data: any) => {
        console.log(data, 'recentEvent');
        this.products = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('getRecentEvents Failed', error);
      }
    );
  }
  highlight(current: string) {
    this.selectedTab = current;
  }
  setRow(row:any)
  {
    var status= localStorage.setItem('status', row.status);
    var eventId=localStorage.setItem('eventId',row.eventId);
    console.log("home redirect"+eventId)
  }
}
