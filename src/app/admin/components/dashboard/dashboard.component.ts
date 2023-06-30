import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor() { }

  ngOnInit() {
    this.data = [
      {
        route: "staff",
        userType: "Staff",
        count: 34,
        userData: [
          {
            fname: "Sanket",
            lname: "Jagtap",
            mobile: 8806328987,
            email: "sanketjagtap479@gmail.com",
          }
        ]
      },
      {
        route: "user",
        userType: "User",
        count: 84,
        userData: [
          {
            fname: "Sanket",
            lname: "Jagtap",
            mobile: 8806328987,
            email: "sanketjagtap479@gmail.com",
          }
        ]
      },
      {
        route: "complaints",
        userType: "Complaints",
        count: 84,
        userData: [
          {
            fname: "Sanket",
            lname: "Jagtap",
            mobile: 8806328987,
            email: "sanketjagtap479@gmail.com",
          }
        ]
      },
    ]
  }

}