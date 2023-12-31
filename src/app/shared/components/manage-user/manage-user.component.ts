import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('addStaffForm') addStaffForm!: NgForm;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  email: any;
  password: any;
  firstName: any;
  lastName: any;
  mobile: any;
  UserRole = 'Staff';
  users: any
  p:number=1;
  constructor(private databaseService: DatabaseService, private sharedService: SharedService) {

  }

  ngOnInit() {
    this.databaseService.getData('Users').subscribe(res=>{
      console.log(res)
      this.users = res.filter(user => user['UserRole'] === 'User');
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(data: any) {
    this.modal.dismiss('confirm');
    console.log(data)
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;


    }
  }

  approve(data:any){
    console.log(data)
    data.Approval='Accept'
    this.databaseService.updateData(data, 'Users').then(res=>{
      console.log(res);

      let body = {
        "service_id": "service_n9wonyp",
        "template_id": "template_gkqwk1p",
        "user_id": "OIkuQG1H0Fprh3tCp",
        "accessToken": "hE6El5yGDArfEl0Zwc5zl",
        "template_params": {
          "to_name": data.FirstName,
          "status": "Approved",
          "to": data.Email
        }
      }
      
      this.sharedService.sendEmail(body);

      this.sharedService.presentToast('User Request Approved', 'success')
    })
  }
  reject(data:any){
    console.log(data)
    data.Approval='Reject'
    this.databaseService.updateData(data, 'Users').then(res=>{
      console.log(res);

      let body = {
        "service_id": "service_n9wonyp",
        "template_id": "template_gkqwk1p",
        "user_id": "OIkuQG1H0Fprh3tCp",
        "accessToken": "hE6El5yGDArfEl0Zwc5zl",
        "template_params": {
          "to_name": data.FirstName,
          "status": "Rejected",
          "to": data.Email
        }
      }
      
      this.sharedService.sendEmail(body);
      this.sharedService.presentToast('User Request Rejected', 'success')

    })
  }

  Search() {
    if (this.firstName == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res: { mobile: string; }) => {
        return RegExp(this.firstName.toLocaleLowerCase()).exec(res.mobile.toLocaleLowerCase())
      })
    }
  }

  deleteUser(id:any){
    console.log(id)
    this.databaseService.deleteData(id, 'Users').then(res=>{
      this.sharedService.presentToast('User Deleted Successfully', 'success')
    }).catch(err=>{
      this.sharedService.presentToast(err, 'danger')
    })
  }
}