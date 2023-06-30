import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HelperModule } from '../helper/helper.module';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    HelperModule,
    IonicModule.forRoot(),
    SharedModule
  ]
})
export class AdminModule { }
