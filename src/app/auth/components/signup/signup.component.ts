import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  email: any;
  password: any;
  firstName: any;
  lastName: any;
  mobile: any;
  file:any;
  
  constructor(private databaseService: DatabaseService, private sharedService: SharedService, private router: Router) { }
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;
  @ViewChild('upload') uploadInputRef!: ElementRef<HTMLInputElement>;
  ngOnInit() { /* TODO document why this method 'ngOnInit' is empty */ }
  signUp(user: any) {
    let file = this.uploadInputRef.nativeElement;
    // check if user is already present

  // this.sharedService.uploadAndDownloadImage(file).subscribe(res=>{
    // console.log("res", res)
    user.UserRole = "User";
    user.Approval = "Pending";
    // user.profileImage = res;
    this.sharedService.signUp(user).then(res=>{
      this.signupForm.resetForm();
    });
  // })
  
    
    
  }

}