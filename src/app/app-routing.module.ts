import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ManageComplaintsComponent } from './shared/components/manage-complaints/manage-complaints.component';
import { ManageProfileComponent } from './shared/components/manage-profile/manage-profile.component';
import { ManageStaffComponent } from './shared/components/manage-staff/manage-staff.component';
import { ManageUserComponent } from './shared/components/manage-user/manage-user.component';
import { ManageSchemesComponent } from './shared/components/manage-schemes/manage-schemes.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-staff', component: ManageStaffComponent },
      { path: 'manage-users', component: ManageUserComponent },
      { path: 'manage-complaints', component: ManageComplaintsComponent },
      { path: 'manage-schemes', component: ManageSchemesComponent },
      { path: 'manage-profile', component: ManageProfileComponent },
    ]
  },
  {
    path: 'staff', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-users', component: ManageUserComponent },
      { path: 'manage-complaints', component: ManageComplaintsComponent },
      { path: 'manage-schemes', component: ManageSchemesComponent },
      { path: 'manage-profile', component: ManageProfileComponent },
    ]
  },
  {
    path: 'users', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-complaints', component: ManageComplaintsComponent },
      { path: 'manage-profile', component: ManageProfileComponent },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
