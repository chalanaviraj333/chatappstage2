import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedserviceService } from '../sharedservice.service';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { Usercheck } from '../usercheck';
import { Group } from '../group.model';
import { group } from 'console';
import { Userrolee } from '../userrolee';
import { User } from '../user.model';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  userName = '';
  userRole = '';
  loggeduser = '';
  selecteduser = {};
  groups = [];
  grouprole = '';
  groupnameList = [];
  userDetails: User;
  superadminbutton: boolean = true;
  checkuserbutton: boolean = false;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  private SharedService: SharedserviceService) { }

  ngOnInit() {

    this.activatedroute.params.subscribe(data => {
      this.userName = data['userName'];
      this.selecteduser = {'selecteduser': data['userName']};
    });


     // fetching groups that user added in
     this.loggeduser = this.storage.get('loggeduser');
     const loggeddetails = {'loggeduser':this.loggeduser};
     this.http.post<{ message: string; groupListofAssis: [] }>("http://localhost:3000/getgroupsofuserassis", loggeddetails)
     .subscribe(groupData => {
       this.groups = groupData.groupListofAssis;
       //console.log(this.groups)
     });

     //fetching allgroupnames for the database
     this.http.get<{message: string; groupnameList:Group[]}>("http://localhost:3000/getallgroupnames")
     .subscribe(data =>
      {
        data.groupnameList.forEach(group => {
          this.groupnameList.push(group.groupname)
        });

      });

    // get logged user details from the database
    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
    .subscribe(data => {
      this.userDetails = data.loggeduserDetails;

          //check selected user is a superadmin
          this.http.post<{userrole: Userrolee }>("http://localhost:3000/checkuserrole", this.selecteduser).
          subscribe(data => {
          const userrole = data.userrole.userRole; 
          console.log(userrole);
          if (userrole !== 'superadmin' && this.userDetails.userRole == 'superadmin')
          {
            this.superadminbutton = false;
          }
          else if (userrole == 'superadmin' && this.userDetails.userRole !== 'groupuser')
          {
            this.checkuserbutton = true;
          }
          });
      });


  }

  onChange(form: NgForm){
    let message = '';
    if (form.invalid) {
      return;
    }
    const userCheck: Usercheck = {username: this.userName, groupname: form.value.groupname};
    this.http.post<{message: string; userIn: {}}>("http://localhost:3000/checkuseringroupornot", userCheck)
    .subscribe(data => {
      if (typeof data.userIn!='undefined' && data.userIn)
      {
        message = 'is already in the Group'
      }
      else
      {
        message = 'is not in the Group'
      }
      this.SharedService.sendedituserdetails(userCheck, message);
      this.router.navigateByUrl('/edituserrole');


    });
  }

  upgradetoSuperAdmin(){

    const superuserdetaails = {'username': this.userName, 'groups': this.groupnameList}
    this.http.post("http://localhost:3000/addallgroupstosuperadmin", superuserdetaails).
    subscribe(data => {

    });

    this.http.post("http://localhost:3000/addnewsuperusertoallgroupadmins", superuserdetaails).
    subscribe(data => {

    });

    this.http.post("http://localhost:3000/changeuserroletosuperadmin", superuserdetaails).
    subscribe(data => {

    });

    this.http.post("http://localhost:3000/addnewsuperusertoallgroupassis", superuserdetaails).
    subscribe(data => {

    });
  }

}
