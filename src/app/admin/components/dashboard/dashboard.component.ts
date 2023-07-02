import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    let decryptedUser = this.sharedService.getUserData();
    console.log(decryptedUser.UserRole);

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
        route: "/staff/manage-complaints",
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
    ];

    // Filter out objects where route is "staff"
    if(decryptedUser.UserRole == "Staff"){
      this.data = this.data.filter((obj: { route: string }) => obj.route !== 'staff');
    }else{

    }

    console.log(this.data);
  }

}
