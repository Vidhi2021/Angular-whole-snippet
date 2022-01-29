import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-top-vendors',
  templateUrl: './top-vendors.component.html',
  styleUrls: ['./top-vendors.component.scss'],
})
export class TopVendorsComponent implements OnInit {
  basicData: any;
  responseData: any;
  isLoading = true;
  basicOptions: any;
  eventsAwarded: any = [];
  labels: any = [];
  roleId:any;
  constructor(
    private homeService: HomeService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.roleId=this.cookieService.get('roleId');
    var obj={
      roleId:this.roleId
    }
    this.homeService.getBestPerformingVendors(obj).subscribe(
      (data: any) => {
        console.log(data, 'Vendor performance');
        if (data != null) {
          this.isLoading = false;
          this.responseData = data;

          for (var i = 0; i < this.responseData.length; i++) {
            this.labels.push(this.responseData[i].fullName);
            this.eventsAwarded.push(this.responseData[i].noOfEventsAwarded);
          }
          // this.responseData.forEach((element:any) => {
          //   console.log(element);
          //   this.eventsAwarded.push(element.noOfEventsAwarded);
          //   this.labels.push(element.userName);
          // });

          console.log(this.labels);
          this.basicData = {
            labels: this.labels,
            datasets: [
              {
                label: 'Number of Events Awarded',
                //backgroundColor: '#42A5F5',
                backgroundColor:'#047CCF',
                data: this.eventsAwarded,
              },
            ],
          };
          console.log(this.basicData);
        } else this.isLoading = true;
      },
      (error) => {
        console.log('Performing vendors Failed', error);
      }
    );
    //   this.basicData = {
    //     labels: ['Vendor 1', 'Vendor 2', 'Vendor 3', 'Vendor 4', 'Vendor 5', 'Vendor 6'],
    //     datasets: [
    //         {
    //             label: 'Number of Events Awarded',
    //             backgroundColor: '#42A5F5',
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         },

    //     ]
    // };

    console.log(this.basicData);
  }
}
