import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ManageStaffComponent } from './components/manage-staff/manage-staff.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageComplaintsComponent } from './components/manage-complaints/manage-complaints.component';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManageSchemesComponent } from './components/manage-schemes/manage-schemes.component';



@NgModule({
  declarations: [ManageStaffComponent, ManageComplaintsComponent, ManageProfileComponent, ManageUserComponent, ManageSchemesComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot(),
    NgxPaginationModule,
    FormsModule
  ],
  exports:[
    ManageStaffComponent,
    ManageComplaintsComponent,
    ManageProfileComponent,
    ManageUserComponent
  ]
})
export class SharedModule { }
