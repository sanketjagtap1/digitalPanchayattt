import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  data: any;
  userCount:any
  staffCount:any
  complaintCount:any

  constructor(private sharedService: SharedService, private datbaseService : DatabaseService) { }

  ngOnInit() {
    let decryptedUser = this.sharedService.getUserData();
    console.log(decryptedUser.UserRole);

   this.datbaseService.getData('Users').subscribe(res=>{
    console.log(res)
    this.data=res;
    let Staff = this.data.filter((obj: { UserRole: string }) => obj.UserRole == 'Staff');
    let User = this.data.filter((obj: { UserRole: string }) => obj.UserRole == 'User');
    // let Staff = this.data.filter((obj: { UserRole: string }) => obj.UserRole == 'User');
    this.staffCount=Staff.length
    this.userCount=User.length
   })

   this.datbaseService.getData('complaints').subscribe(res=>{
    console.log(res)
   
    
    // let Staff = this.data.filter((obj: { UserRole: string }) => obj.UserRole == 'User');
    this.complaintCount=res.length
   })
   
  }

}
