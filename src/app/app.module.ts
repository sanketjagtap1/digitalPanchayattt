import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { environment } from 'src/environments/environment';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app'
import {getFirestore, provideFirestore} from '@angular/fire/firestore'
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AuthModule,HttpClientModule, StaffModule, UserModule, AdminModule,provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=>getFirestore()),provideStorage(() => getStorage()),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
