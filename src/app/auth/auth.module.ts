import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';



@NgModule({
  declarations: [AuthComponent, SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule.forRoot(),
  ]
})
export class AuthModule { }
