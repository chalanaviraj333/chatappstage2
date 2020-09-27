import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from '../sharedservice.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-removeuserfromgroup',
  templateUrl: './removeuserfromgroup.component.html',
  styleUrls: ['./removeuserfromgroup.component.css']
})
export class RemoveuserfromgroupComponent implements OnInit {

  removingUser = {};

  constructor(public dialogRef: MatDialogRef<RemoveuserfromgroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private activatedroute: ActivatedRoute,private SharedService: SharedserviceService) { }

  ngOnInit() {

    this.removingUser = this.SharedService.getData();
  }

  cancel(){
    this.dialogRef.close();
  }

  removeuserfromGroup(){

    this.http.post("http://localhost:3000/removegrouptotheuser", this.removingUser)
    .subscribe(response => {
        //console.log(response);
})
this.dialogRef.close();
}

}
