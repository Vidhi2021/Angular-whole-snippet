import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { Product } from '../models/products';
import { CommonService } from '../services/common.service';
import { HomeService } from '../services/home/home.service';
//import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user_role: any;
  products: Product[] = [];
  clicked: boolean = false;
  cols: any[] = [];
  isEndCustomerLoading = true;
  data: any;
  cardDetails: any;
  roleId: any;
  constructor(
    private commonService: CommonService,
    private cookieService: CookieService,
    private homeService: HomeService
  ) {
    this.data = {
      labels: [
        'Request For Events',
        'Upcoming Events',
        'Ongoing Events',
        'Closed Events',
      ],
      datasets: [
        {
          data: [300, 50, 100, 70],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFC89'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFC89'],
        },
      ],
    };
  }

  ngOnInit(): void {
    // this.user_role="Business owner";
    // this.commonService.getFiles().subscribe((data) => {
    //   console.log('data from api', data);
    // });
    this.roleId=this.cookieService.get('roleId');
    var obj={
      roleId:this.roleId,
    }

    this.homeService.getCardDetails(obj).subscribe((data: any) => {
      this.cardDetails = data;
      console.log('card Detils  came', this.cardDetails);
    });

    this.isEndCustomerLoading = false;

    // this.user_role = localStorage.getItem('user_role');
    // console.log(localStorage.getItem('user_role'));
    this.user_role = this.cookieService.get('user_role');
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
    ];
  }
}
