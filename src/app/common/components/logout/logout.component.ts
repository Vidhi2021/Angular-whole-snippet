import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(
      () => {
        window.location.href = 'https://localhost:4200/logOut'
      }, 2000);
  }

}
