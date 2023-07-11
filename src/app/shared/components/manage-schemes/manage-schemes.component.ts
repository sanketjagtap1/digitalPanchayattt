import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-schemes',
  templateUrl: './manage-schemes.component.html',
  styleUrls: ['./manage-schemes.component.scss'],
})
export class ManageSchemesComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('addSchemeForm', { static: false }) addSchemeForm!: NgForm;
  @ViewChild('upload') uploadInputRef!: ElementRef<HTMLInputElement>;

  schemeForm: FormGroup;
  schemeName!: string;
  schemeDetails: any;
  qualification!: string;
  description!: string;
  documentsNeeded!: string;
  isModalOpen = false;
  isModalOpen1 = false;
  isModalOpen2 = false;
  showSchemeDetails = false;
  decryptedUser: any;
  users: any;
  msg: any;
  id: any = '';
  p: number = 1;
  schemeId: any;



  // apply for scheme form
  qualification1!: string;
  name!: string;
  age!: number;
  education!: string;
  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private sharedService: SharedService, private router: Router) {
    this.schemeForm = this.formBuilder.group({
      schemeName: ['', Validators.required],
      qualification: ['', Validators.required],
      description: ['', Validators.required],
      documentsNeeded: ['', Validators.required],
    });
  }



  ngOnInit() {
    // Initialization code goes here
    this.decryptedUser = this.sharedService.getUserData();
    this.databaseService.getData('Schemes').subscribe(res => {
      console.log(res)
      this.users = res;
    })
  }

  close(no: any) {
    if (no == 'isModalOpen1') {
      this.isModalOpen1 = false;
    } else if (no == 'isModalOpen2') {
      this.isModalOpen2 = false;

    }
  }
  cancel() {
    this.modal.dismiss(null, 'cancel').then(res => {
      if (res) {
        console.log(res);
        this.isModalOpen = false;
        this.id = ''
        this.schemeName = ''
        this.description = ''
        this.documentsNeeded = ''
        this.qualification = ''
      }
    }).catch(err => {
      console.log(err);
    });
  }

  confirm(data: any) {
    this.modal.dismiss('confirm').then(res => {
      console.log("res=====>", res);
      this.databaseService.addData(data, 'Schemes').then(res => {
        // Reset the form after submission
        this.id = ''
        this.schemeName = ''
        this.description = ''
        this.documentsNeeded = ''
        this.qualification = ''
        this.sharedService.presentToast("Scheme Created Succesfully", 'success')
      }).catch(err => {
        this.sharedService.presentToast("Scheme Creatiation failes" + err, 'danger')

      });
      this.isModalOpen = false

    }).catch(err => {
      console.log(err);
    });
  }

  update(data: any) {
    data.id = this.id;
    console.log("Form data for update=========>", data);

    this.databaseService.updateData(data, 'Schemes')
      .then(() => {
        this.isModalOpen = false
        console.log('Record updated successfully!');
        this.sharedService.presentToast("User updated successfully!", "sucess")
        // You can perform additional actions here if needed
      })
      .catch((error) => {
        console.error('Error updating:', error);
        this.sharedService.presentToast("Error updating user", "danger")
        // Handle the error or throw it to be caught elsewhere
        throw error;
      });
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(`Hello, ${ev.detail.data}!`);
    }
  }


  setOpen(isOpen: boolean, id: any) {
    console.log(id)
    if (id == '') {
      this.isModalOpen = isOpen;

    } else {
      this.isModalOpen1 = isOpen;
      this.schemeId = id
    }
  }


  deletUser(id: any) {
    console.log(id)
    this.databaseService.deleteData(id, 'Schemes').then(res => {
      this.sharedService.presentToast('Record Deleted Successfully', 'success')
    }).catch(err => {
      this.sharedService.presentToast(err, 'danger')
    })
  }
  apply(data: any) {
    console.log(data)

    console.log(this.decryptedUser.id)
    console.log(this.schemeId)
    this.sharedService.uploadAndDownloadImage(this.uploadInputRef.nativeElement).subscribe(res => {

      data.schemeId = this.schemeId;
      data.userId = this.decryptedUser.id;
      data.doc = res;

      console.log(data)
      this.databaseService.addData(data, 'schemeRegistration').then(res => {
        console.log(res)
        this.sharedService.presentToast("Successfully Applied", "success")
      }).catch(err => {
        console.log(err)
        this.sharedService.presentToast("Failed To Apply", "danger")

      })
    })

  }

  editUser(id: any) {
    this.isModalOpen = true;
    this.databaseService.getDataById(id, 'Schemes').subscribe(res => {
      this.id = res['id']
      this.schemeName = res['schemeName']
      this.description = res['description']
      this.documentsNeeded = res['documentsNeeded']
      this.qualification = res['qualification']
      // console.log(res)
    })
  }

  formValid(): boolean {
    return this.schemeForm.valid;
  }

  openModal(name: any, id: any) {
    if (name == 'isModalOpen') {
      this.isModalOpen = true;
    } else if (name == 'showSchemeDetails') {
      this.showSchemeDetails = true;
      this.getSchemeMembers(id)
    }
  }
  closeModal(name: any) {
    if (name == 'isModalOpen') {
      this.isModalOpen = false;
    } else if (name == 'showSchemeDetails') {
      this.showSchemeDetails = false;
    }
  }

  getSchemeMembers(schemeId: any) {
    this.databaseService.getDataByKey(schemeId, 'schemeId', 'schemeRegistration').subscribe(res => {
      console.log(res);
      this.schemeDetails = res;
    })
  }

  updateStatus(data: any, status: any) {
    data['status'] = status;
    console.log(data)

    if (status == 'accept') {
      this.msg = 'Case Approved Succesfully'
      // Implimenting the email service
      let body = {
        "service_id": "service_n9wonyp",
        "template_id": "template_2ee8kio",
        "user_id": "OIkuQG1H0Fprh3tCp",
        "accessToken": "hE6El5yGDArfEl0Zwc5zl",
        "template_params": {
    "to_name": "Sanket",
    "Scheme_Name": "Di",
    "Status": "Approved",
    "send_to": "sanketjagta479@gmail.com"
    }
    }
      // this.sharedService.sendEmail(body)
    } else {
      this.msg = 'Case Reject Succesfully'
      let body = {
        "service_id": "service_n9wonyp",
        "template_id": "template_2ee8kio",
        "user_id": "OIkuQG1H0Fprh3tCp",
        "accessToken": "hE6El5yGDArfEl0Zwc5zl", 
        "template_params": {
    "to_name": "Sanket",
    "Scheme_Name": "Di",
    "Status": "Rejected",
    "send_to": "sanketjagta479@gmail.com"
    }
    }
      // this.sharedService.sendEmail(body)
    }
    this.databaseService.updateData(data, 'schemeRegistration').then(res => {
      this.sharedService.presentToast(this.msg, 'success')
    }).catch(err => {
      this.sharedService.presentToast('Unable  to proccess request', 'danger')
    })
  }


}
