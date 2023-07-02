import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {




  constructor(private sharedService: SharedService) { }

  ngOnInit() { }

  uploadFile(input: HTMLInputElement) {
    console.log("input", input)
    this.sharedService.uploadAndDownloadImage(input).subscribe(res=>{
      console.log("re4s in first method========>",res)
    })
  }


}


