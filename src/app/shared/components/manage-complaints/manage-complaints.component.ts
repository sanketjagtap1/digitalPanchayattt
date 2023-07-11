import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DatabaseService } from 'src/app/services/databaseSrvice/database.service';
import { SharedService } from '../../shared.service';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, docData, doc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore'

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
  isModalOpen1=false;
  element:any;
  p:number=1;
  comments!:any;

  @Input() complaint: any;
  comment!: string;
  constructor(private sharedService: SharedService,private firestore: Firestore, private databaseService: DatabaseService, private toastController: ToastController) {

  }

  ngOnInit() {
    this.databaseService.getData('complaints').subscribe(res=>{
      console.log(res)
      this.users=res;
    })
  }

  fetchComments(id:any) {
    console.log(id)
    this.databaseService.getComments(id).subscribe(res=>{
      console.log(res)
      this.comments=res;
    })
  }

  viewDocument(documentUrl: string) {
    // Handle document viewing logic here
    console.log('Viewing document:', documentUrl);
  }


  postComment() {
    // Handle posting comment logic here
    console.log('Posting comment:', this.comment);
   let commentData={
    complaintId: this.element.id,
    comment: this.comment
    }

    this.databaseService.addData(commentData, 'comments').then(res=>{
      console.log(res)
      this.sharedService.presentToast('Comment Posted', 'success')
    }).catch(err=>{
      console.log(err);
      this.sharedService.presentToast('Comment failed', 'danger')
    })
    // Show a toast message to indicate the comment was posted
    this.presentToast('Comment posted successfully');
    
    // Clear the comment input field
    this.comment = '';
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  close() {
    this.isModalOpen1=false;
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setOpen(isOpen: boolean, name:any, data?:any) {
    if(name=='isModalOpen'){
      this.isModalOpen = isOpen;
    }else{
      this.isModalOpen1 = isOpen;
      this.element=data;
      this.fetchComments(this.element.id)
    }
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