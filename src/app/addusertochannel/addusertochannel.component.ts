import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addusertochannel',
  templateUrl: './addusertochannel.component.html',
  styleUrls: ['./addusertochannel.component.css']
})
export class AddusertochannelComponent implements OnInit {

  addingUser = {};

  constructor(public dialogRef: MatDialogRef<AddusertochannelComponent>,private SharedService: SharedserviceService, private http: HttpClient) { }

  ngOnInit() {
    this.addingUser = this.SharedService.getDeleteChannel();
  }

  cancel(){
    this.dialogRef.close();
  }


  adduserfromChannel(){
    //console.log(this.addingUser);
    this.http.post("http://localhost:3000/addusertothechannel", this.addingUser)
        .subscribe(response => {
            console.log(response);
    })
    this.dialogRef.close();
  }


}
