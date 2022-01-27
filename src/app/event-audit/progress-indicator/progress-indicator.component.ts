import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {
  completed_status: boolean=false;
  @Input() eventStatus:any;
  constructor(
    private cookieService: CookieService,
    //private toastr: ToastrService
  ) {}

  user_role: String = "";
  username = "";

  @ViewChild("t1", { static: true })
  t1!: NgbTooltip;
  @ViewChild("t2", { static: true })
  t2!: NgbTooltip;
  @ViewChild("t3", { static: true })
  t3!: NgbTooltip;
  @ViewChild("t4", { static: true })
  t4!: NgbTooltip;
  @ViewChild("t5", { static: true })
  t5!: NgbTooltip;


  showTooltip() {
    if (this.eventStatus.toLowerCase()== "requested") {
      this.t1.close();
      setTimeout(() => this.t1.open(), 1000);
    } else if (this.eventStatus.toLowerCase() == "in progress") {
      this.t2.close();
      setTimeout(() => this.t2.open(), 4000);
    } else if (this.eventStatus.toLowerCase() == "concluded") {
      this.t3.close();
      setTimeout(() => this.t3.open(), 4000);
    } else if (this.eventStatus.toLowerCase() == "closed") {
      this.t4.close();
      setTimeout(() => this.t4.open(), 4000);
    }
    else if (this.eventStatus.toLowerCase() == "not concluded") {
      this.t5.close();
      setTimeout(() => this.t5.open(), 4000);
    }
  }
  percentageComplete!: number;
  currentStage!: number;
  date = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
  notConcluded:boolean=false;
  concluded:boolean=false;
  cancelled:boolean=false;
  tooltipDefaultText:any;

  ngOnInit() {
    this.tooltipDefaultText = this.completed_status!=true ? "Your event is here ":"Event Has been ended."
    this.user_role = this.cookieService.get("user_role");
    this.username = this.cookieService.get("username");
    this.eventStatus=localStorage.getItem('status');
    console.log(this.eventStatus);
    if(this.eventStatus.toLowerCase()=="concluded")
    this.concluded=true;
    if(this.eventStatus.toLowerCase()=="cancelled")
    this.cancelled=true;
    if(this.eventStatus.toLowerCase()=="not concluded")
    {
      this.completed_status=false;
      this.notConcluded=true;
    }
    else
    {
      this.completed_status=true;
    }
    this.calculateProgress();
  }
  progressBarStage:any = {
    firstStage: "requested",
    secondStage:"scheduled",
    thirdStage:"in progress",
    fourthStage:"closed",
    fifthStage:"not concluded",
    sixthStage:"concluded",
    seventhStage:"cancelled",
  };

  
  //length of complete progress bar is 76% and 12% margin on both side
  calculateProgress = () => {
     if (this.eventStatus.toLowerCase() === this.progressBarStage["firstStage"]
     || this.eventStatus.toLowerCase() === this.progressBarStage["secondStage"]) {
      console.log(this.progressBarStage["firstStage"])
      this.percentageComplete = 60 * 0;
      this.currentStage = 1;
    } else if (this.eventStatus.toLowerCase() == this.progressBarStage["thirdStage"]) {
      console.log(this.progressBarStage["thirdStage"])
      this.percentageComplete = 60 * 0.33;
      this.currentStage = 2;
    } else if (this.eventStatus.toLowerCase() === this.progressBarStage["fourthStage"]) {
      console.log(this.progressBarStage["fourthStage"])
      this.currentStage = 3;
      this.percentageComplete = 60 * 0.66;
    } else if (this.eventStatus.toLowerCase() == this.progressBarStage["fifthStage"]) {
      console.log(this.progressBarStage["fifthStage"])
      this.currentStage = 4;
      this.percentageComplete = 60 * 1;
    }
    else if (this.eventStatus.toLowerCase() == this.progressBarStage["sixthStage"]) {
      console.log(this.progressBarStage["sixthStage"])
      this.currentStage = 4;
      this.percentageComplete = 60 * 1;
    } else if (this.eventStatus.toLowerCase() == this.progressBarStage["seventhStage"]) {
      console.log(this.progressBarStage["seventhStage"])
      this.currentStage = 4;
      this.percentageComplete = 60 * 1;
    }  else {
      console.log("ERROOOOR")
      this.currentStage = 1;
      this.percentageComplete = 0;
    }
  };

}


