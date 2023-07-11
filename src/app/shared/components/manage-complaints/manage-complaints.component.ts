import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-manage-complaints',
  templateUrl: './manage-complaints.component.html',
  styleUrls: ['./manage-complaints.component.scss'],
})
export class ManageComplaintsComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('complaintForm') complaintForm!: NgForm;
  @ViewChild('upload') uploadInputRef!: ElementRef<HTMLInputElement>;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  title!: string;
  description!: string;
  address!: string;
  selectedImage!: File;
  users: any;
  firstName:any;
  isModalOpen=false;
  decryptedUser:any;
  p:number=1;
  constructor(private sharedService: SharedService, private databaseService: DatabaseService) {

  }

  ngOnInit() {
    this.decryptedUser = this.sharedService.getUserData();
    this.databaseService.getData('complaints').subscribe(res=>{
      console.log(res)
      this.users=res;
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(data: any) {
    this.modal.dismiss('confirm');
    console.log(data)
    let file = this.uploadInputRef.nativeElement;
    this.sharedService.uploadAndDownloadImage(file).subscribe(res=>{
      console.log("res", res)

      data['status'] = "Pending";
      data['image'] = res;
      this.databaseService.addData(data, 'complaints').then(res=>{
        console.log(res);
        
      })
      
    })
  }

  

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  Search() {
    // if (this.firstName == '') {
    //   this.ngOnInit();
    // } else {
    //   this.users = this.users.filter((res: { mobile: string; }) => {
    //     return RegExp(this.firstName.toLocaleLowerCase()).exec(res.mobile.toLocaleLowerCase())
    //   })
    // }
  }
}