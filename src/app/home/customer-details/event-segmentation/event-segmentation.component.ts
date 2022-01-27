import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-event-segmentation',
  templateUrl: './event-segmentation.component.html',
  styleUrls: ['./event-segmentation.component.scss'],
})
export class EventSegmentationComponent implements OnInit {
  //Graph data
  data: any;
  options: any;
  //Adding data from filter
  // labels = [];
  isLoading = true;
  customer_segmentation = [];

  basicData: any;
  responseData: any;

  basicOptions: any;
  eventsAwarded: any = [];
  labels: any = [];
  roleId:any;
  constructor(private homeService: HomeService,private cookieService:CookieService) {}

  ngOnInit(): void {
    // this.isLoading = false;
    // this.homeService.getEventStatusComparison().subscribe((data: any) => {
    //   console.log('getEventStatusComparison', data);
    // });
    this.roleId=this.cookieService.get('roleId');
    var obj={
      roleId:this.roleId,
    }
    this.homeService.getDoughnutChartDetails(obj).subscribe(
      (data: any) => {
        console.log(data, 'Vendor performance');
        if (data != null) {
          this.isLoading = false;
          this.responseData = data;

          // for (var i = 0; i < this.responseData.length; i++) {
          //   this.labels.push(this.responseData[i].userName);
          //   this.eventsAwarded.push(this.responseData[i].noOfEventsAwarded);
          // }
          // this.responseData.forEach((element:any) => {
          //   console.log(element);
          //   this.eventsAwarded.push(element.noOfEventsAwarded);
          //   this.labels.push(element.userName);
          // });

          console.log(this.labels);
          this.basicData = {
            labels: [
              'Requested Events',
              'Upcoming Events',
              'Ongoing Events',
              'Closed Event',
              'Cancelled Event',
            ],
            datasets: [
              {
                label: 'Number of Events Awarded',
                backgroundColor: [
                  '#047CCF',
                  '#98D44B',
                  '#0098DB',
                  '#000BAD',
                  '#FF8A8A',
                ],
                data: [
                  this.responseData.eventRequestedcount,
                  this.responseData.eventUpcomingcount,
                  this.responseData.eventInProgresscount,
                  this.responseData.eventClosedcount,
                  this.responseData.eventCancelledCount,
                ],
              },
            ],
          };
          this.options = {
            plugins: {
              labels: {
                position: 'outside',

                textMargin: 4,
              },
            },
            cutoutPercentage: 70,
            legend: {
              labels: {
                boxWidth: 20,
              },
              position: 'right',
              align: 'middle',
            },
          };

          console.log(this.basicData);
        } else this.isLoading = true;
      },
      (error) => {
        console.log('Performing vendors Failed', error);
      }
    );
  }
}
