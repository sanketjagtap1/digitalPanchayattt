import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import { SharedService } from 'src/app/shared/shared.service';
import { first } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {


  email: any;
  password: any;

  constructor(private databaseService: DatabaseService, private sharedService: SharedService, private router: Router) {
  }

  ngOnInit() { /* There is no method which run on page load */
    this.checkLoggedInStatus();
  }

  checkLoggedInStatus(): void {
    
    let decryptedUser = this.sharedService.getUserData();

      if (decryptedUser && decryptedUser['UserRole']) {
        const userRole = decryptedUser['UserRole'];

        // Redirect the user to the appropriate dashboard based on user role
        switch (userRole) {
          case 'Admin':
            this.router.navigate(['/admin/dashboard']).then(() => {
              console.log('Redirected to admin dashboard');
            }).catch((err) => {
              console.log(err);
            });
            break;
          case 'Staff':
            this.router.navigate(['/staff/dashboard']).then(() => {
              console.log('Redirected to staff dashboard');
            }).catch((err) => {
              console.log(err);
            });
            break;
          default:
            this.router.navigate(['/users/manage-schemes']).then(() => {
              console.log('Redirected to user dashboard');
            }).catch((err) => {
              console.log(err);
            });
            break;
        }
      }
    
  }

  login() {
    // Perform login logic here
    console.log('Login clicked');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.databaseService.searchUserByEmailAndPassword(this.email, this.password, 'Users')
      .pipe(first())
      .subscribe(res => {
        console.log("Email Password Response==========>", res);

        if (res.length !== 0) {
          const user = res[0];
          user['loggedIn'] = true; // Add 'loggedIn' key to the user object and set it to true
          // Remove the password key from the user object
          delete user['password'];
          // Encrypt the user data
          const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), 'encryptionKey').toString();
          localStorage.setItem('user', encryptedUser); // Store encrypted user details in localStorage

          if (user['UserRole'] === 'Admin') {
            this.router.navigate(['/admin/dashboard']).then(() => {
              console.log(res);
              this.sharedService.presentToast('Login Success', 'success').then(() => { }).catch((err) => { });
            }).catch((err) => {
              console.log(err);
            });
          } else if (user['UserRole'] === 'Staff') {
            this.router.navigate(['/staff/dashboard']).then(() => {
              console.log(res);
              this.sharedService.presentToast('Login Success', 'success').then(() => { }).catch((err) => { });
            }).catch((err) => {
              console.log(err);
            });
          } else {
            if(user['Approval']=='Accept'){
              this.router.navigate(['/users/manage-schemes']).then(() => {
                console.log(res);
              }).catch((err) => {
                console.log(err);
              });
              this.sharedService.presentToast('Login Success', 'success').then(() => { }).catch((err) => { });
            }else{
              this.sharedService.presentToast('Request Not Yet Approved', 'danger')
            }
          }
        } else {
          console.log('Login Failed');
          this.sharedService.presentToast('Invalid Email Or Password', 'danger').then(() => { }).catch((err) => { });
        }
      });
  }

}
