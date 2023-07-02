import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/databaseSrvice/database.service';
import { Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { CommonServiceService } from '../services/commonSrvice/common-service.service';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly storage: Storage = inject(Storage);
  constructor(private toastController: ToastController, private databaseService: DatabaseService, private router: Router, private commonServices: CommonServiceService) { }

  
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
  
  getUserData(){
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
      // User is logged in
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser, 'encryptionKey');
      const decryptedUser = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

      // Use the decrypted user data as needed
      console.log('Logged in user:', decryptedUser);
      return decryptedUser;
  } else {
    // User is not logged in
    console.log('User not logged in');
  }
  }



uploadAndDownloadImage(input: HTMLInputElement): Observable<string | null> {
  console.log(input);
  if (!input.files) return new Observable<string | null>();

  const files: FileList = input.files;

  return new Observable<string | null>((observer) => {
    const uploadPromises: Promise<any>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        const uploadPromise = uploadBytesResumable(storageRef, file)
          .then((res) => {
            console.log(res.ref.name);
            if (res) {
              return this.downloadImage(res.ref.name);
            } else {
              return null;
            }
          })
          .catch((err) => {
            console.log(err);
            return null;
          });

        uploadPromises.push(uploadPromise);
      }
    }

    Promise.all(uploadPromises)
      .then((urls) => {
        const filteredUrls = urls.filter((url) => url !== null) as string[];
        observer.next(filteredUrls[0]); // Assuming we only process the first uploaded file
        observer.complete();
      })
      .catch((err) => {
        console.log(err);
        observer.next(null);
        observer.complete();
      });
  });
}

downloadImage(imageName: string): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    this.commonServices.getPosts(imageName).subscribe({
      next: (res) => {
        console.log(res);
        const url = `https://firebasestorage.googleapis.com/v0/b/digitalpanchayat-e64a4.appspot.com/o/${res.name}?alt=media&token=${res.downloadTokens}`;
        console.log(url);
        resolve(url);
      },
      error: (err) => {
        console.log(err);
        resolve(null);
      }
    });
  });
}

  
}
