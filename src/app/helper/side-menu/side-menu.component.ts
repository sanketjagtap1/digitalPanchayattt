import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  tabs: any[] = [];
  decryptedUser:any
  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.getUserData()
    this.fetchMenuItems(this.decryptedUser['UserRole']); // Call the method to fetch menu items from the backend
  }

  getUserData() {
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
      // User is logged in
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser, 'encryptionKey');
      this.decryptedUser = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

      // Use the decrypted user data as needed
      console.log('Logged in user:', this.decryptedUser);
    }
  }

  fetchMenuItems(userRole:any) {
    // Use your menu service to fetch routes from the backend based on the user type
    this.databaseService.getRoutes(userRole).subscribe((response) => {
      console.log(response)
      // Assuming the response is an array of menu items with properties: title, icon, and route
      this.tabs = response;
    });
  }

  logout() {
    // Remove user data from localStorage
    localStorage.removeItem('user');
    // Redirect to the login page or any other desired page
    this.router.navigate(['/auth/signin']);
  }

}
