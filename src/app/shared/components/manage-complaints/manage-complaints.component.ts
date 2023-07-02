import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-manage-complaints',
  templateUrl: './manage-complaints.component.html',
  styleUrls: ['./manage-complaints.component.scss'],
})
export class ManageComplaintsComponent  implements OnInit {

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
  constructor() {

  }

  ngOnInit() {
    this.users = [
      {
        sr: 1,
        fname: "Sanket",
        lname: "Sanket",
        email: "Sanket",
        mobile: "8806328987",
      },
      {
        sr: 2,
        fname: "rahul",
        lname: "Sanket",
        email: "Sanket",
        mobile: "9022898699",
      },
      {
        sr: 3,
        fname: "akash",
        lname: "Sanket",
        email: "Sanket",
        mobile: "774383",
      },
      {
        sr: 4,
        fname: "mohit",
        lname: "Sanket",
        email: "Sanket",
        mobile: "915628",
      },
      {
        sr: 5,
        fname: "rahul",
        lname: "Sanket",
        email: "Sanket",
        mobile: "7272",
      },
      {
        sr: 5,
        fname: "rahul",
        lname: "Sanket",
        email: "Sanket",
        mobile: "7373",
      },
      {
        sr: 6,
        fname: "rahul",
        lname: "Sanket",
        email: "Sanket",
        mobile: "7474",
      },
      {
        sr: 7,
        fname: "rahul",
        lname: "Sanket",
        email: "Sanket",
        mobile: "7575",
      },
    ]
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


  Search() {
    if (this.firstName == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res: { mobile: string; }) => {
        return RegExp(this.firstName.toLocaleLowerCase()).exec(res.mobile.toLocaleLowerCase())
      })
    }
  }
}