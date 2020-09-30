import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { SharedserviceService } from '../sharedservice.service';

@Component({
  selector: 'app-removeuserchannel',
  templateUrl: './removeuserchannel.component.html',
  styleUrls: ['./removeuserchannel.component.css']
})
export class RemoveuserchannelComponent implements OnInit {

  removingUser = {};

  constructor(public dialogRef: MatDialogRef<RemoveuserchannelComponent>,private SharedService: SharedserviceService,
    private http: HttpClient) { }

  ngOnInit() {
    this.removingUser = this.SharedService.getDeleteChannel();
  }

  cancel(){
    this.dialogRef.close();
  }

  removeuserfromChannel(){

    this.http.post("http://localhost:3000/removechanneltotheuser", this.removingUser)
    .subscribe(response => {
        //console.log(response);
  })
    this.dialogRef.close();
  }

}
