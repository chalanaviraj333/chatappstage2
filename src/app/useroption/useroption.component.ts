import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from '../sharedservice.service';

import { HttpClient } from '@angular/common/http';
import { groupDetails } from '../groupdetails';


@Component({
  selector: 'app-useroption',
  templateUrl: './useroption.component.html',
  styleUrls: ['./useroption.component.css']
})
export class UseroptionComponent implements OnInit {

  groupDetails: groupDetails;

  constructor(public dialogRef: MatDialogRef<UseroptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private activatedroute: ActivatedRoute,private SharedService: SharedserviceService) { }

  ngOnInit() {

    this.groupDetails = this.SharedService.getData();
    // console.log(this.groupDetails);
  }

  cancel(){
    this.dialogRef.close();
  }

  adduserfromGroup(){

        // console.log(this.groupDetails);
        this.http.post("http://localhost:3000/setgroupDetails", this.groupDetails)
        .subscribe(response => {
            //console.log(response);
    })
    this.dialogRef.close();
  }

}
