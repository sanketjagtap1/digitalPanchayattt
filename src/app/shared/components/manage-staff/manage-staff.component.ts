import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SharedService } from '../../shared.service';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';


@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss'],
})
export class ManageStaffComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('addStaffForm', { static: false }) addStaffForm!: NgForm;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  id: any='';
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  mobile: any;
  search: any;
  users: any
  p: number = 1;
  isModalOpen = false;
  constructor(private databaseService: DatabaseService, private sharedService: SharedService, private router: Router) {
    // TODO document why this constructor is empty
  }

  ngOnInit() {

    this.databaseService.getData('Users').subscribe(res=>{
      console.log(res)
      this.users = res.filter(user => user['UserRole'] === 'Staff');
    })
  }
  
  cancel() {
    this.modal.dismiss(null, 'cancel').then(res => {
      if (res) {
        console.log(res);
        this.isModalOpen=false;
        this.id='';
      this.firstName='';
      this.lastName='';
      this.email='';
      this.mobile='';
      this.password='';
        
      }
    }).catch(err => {
      console.log(err);
    });
  }
  
  confirm(data: any) {
    this.modal.dismiss('confirm').then(res => {
      console.log("res=====>", res);
      
      // check if data is already present
      data.UserRole = "Staff";
      console.log("data======>", data)
      
      this.sharedService.signUp(data);
      this.id='';
      this.firstName='';
      this.lastName='';
      this.email='';
      this.mobile='';
      this.password='';
      this.isModalOpen=false
      
    }).catch(err => {
      console.log(err);
    });
  }
  
  update(data:any){
    data.id = this.id;
    console.log("Form data for update=========>",data);
    
    this.databaseService.updateData(data, 'Users')
    .then(() => {
      this.id='';
      this.firstName='';
      this.lastName='';
      this.email='';
      this.mobile='';
      this.password='';
      this.isModalOpen=false
      console.log('User updated successfully!');
      this.sharedService.presentToast("User updated successfully!", "sucess")
      // You can perform additional actions here if needed
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      this.sharedService.presentToast("Error updating user", "danger")
      // Handle the error or throw it to be caught elsewhere
      throw error;
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  Search() {
    if (this.search == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res: { Mobile: string; }) => {
        return RegExp(this.search.toLocaleLowerCase()).exec(res.Mobile.toLocaleLowerCase())
      })
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  deletUser(id:any){
    console.log(id)
    this.databaseService.deleteData(id, 'Users').then(res=>{
      this.sharedService.presentToast('User Deleted Successfully', 'success')
    }).catch(err=>{
      this.sharedService.presentToast(err, 'danger')
    })
  }

  editUser(id:any){
    console.log(id);
    this.isModalOpen=true;
    this.databaseService.getDataById(id, 'Users').subscribe(res=>{
      // console.log(res)
      this.id=res["id"];
      this.firstName=res["FirstName"];
      this.lastName=res["LastName"];
      this.email=res["Email"];
      this.mobile=res["Mobile"];
      this.password=res["Password"];
    })
  }

}