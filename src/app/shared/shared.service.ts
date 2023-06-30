import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/databaseSrvice/database.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private toastController: ToastController, private databaseService: DatabaseService, private router: Router) { }

  async presentToast(message: any, Color: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: "bottom",
      color: Color
    });

    await toast.present().then((res) => {
      console.log(res)

    }).catch(err => {
      console.log(err)
    });
  }

  // userCreation
  async signUp(user: any) {
    try {
      // check if user is already present
      const emailCheckResult = await firstValueFrom(this.databaseService.checkEmail(user.Email));
      console.log("Email check res========>", emailCheckResult);
      
      if (emailCheckResult.length == 0) {
        const mobileCheckResult = await firstValueFrom(this.databaseService.checkMobile(user.Mobile));
        console.log("Mobile response========>", mobileCheckResult);
        
        if (mobileCheckResult.length == 0) {
          const addDataResult = await this.databaseService.addData(user, 'Users');
          console.log(addDataResult.id);
          
          if (addDataResult.id) {
            await this.presentToast("User Created Successfully", "success");
            
            if (user.UserRole == "Staff") {
              // Do something if user role is Staff
            } else {
              await this.router.navigate(['/']);
            }
          }
        } else {
          await this.presentToast("Mobile No Already Exists", "danger");
        }
      } else {
        await this.presentToast("Email Id Already Exists", "danger");
      }
    } catch (error) {
      console.log(error);
      await this.presentToast("User Creation Failed", "danger");
    }
  }
  
}
