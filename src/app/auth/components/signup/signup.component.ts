import { Component, OnInit, ViewChild } from '@angular/core';
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

  
  constructor(private databaseService: DatabaseService, private sharedService: SharedService, private router: Router) { }
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;

  ngOnInit() { /* TODO document why this method 'ngOnInit' is empty */ }

  signUp(user: any) {
    // check if user is already present
    user.UserRole = "User";
    user.Approval = "Pending";
    this.sharedService.signUp(user);
    this.signupForm.resetForm();
  }

}