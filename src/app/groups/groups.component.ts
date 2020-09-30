import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { GroupsService } from '../groups.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { SharedserviceService } from '../sharedservice.service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { Group } from '../group.model';
import { User } from '../user.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  superadmins: User[] = [];
  groups = [];
  groupofAdmin = [];
  userRole = ''; 
  groupcreate: boolean = true;
  loggeduser = '';
  userDetails: User;
  groupedit: boolean = true;
  groupdelete: boolean = true;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,private router: Router,
  private GroupService: GroupsService, private http: HttpClient, private SharedService: SharedserviceService) { }

  ngOnInit() {

    const loggeddetails = {'loggeduser': this.storage.get('loggeduser')};

    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
    .subscribe(data => {
      const userDetails: User = data.loggeduserDetails;

      if (userDetails.userRole == 'superadmin' || userDetails.userRole == 'groupadmin')
      {
        this.groupcreate = false;
      }
    });

    this.http.post<{ message: string; groupList: User }>("http://localhost:3000/getgroupsofuseradd", loggeddetails)
    .subscribe(data => {
      this.groups = data.groupList.groups;
    });

    // get all super admins from the database
    this.http.get<{ message: string; superadmins: User[] }>("http://localhost:3000/getsuperadmins")
    .subscribe(data => {
      this.superadmins = data.superadmins;
      console.log(this.superadmins);
    });


    // get logged user details from the database
    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
    .subscribe(data => {
      this.userDetails = data.loggeduserDetails;
      if (this.userDetails.userRole == 'superadmin')
      {
        this.groupedit = false;
        this.groupdelete = false;
      }
      else if (this.userDetails.userRole == 'groupadmin' || this.userDetails.userRole == 'groupassis')
      {
        this.groupedit = false;
      }
    });
      
    this.http.post<{message: string; groupListofAssis: Group[]}>("http://localhost:3000/getgroupsofuserassis", loggeddetails)
      .subscribe(data => {
        data.groupListofAssis.forEach(group => {
          this.groupofAdmin.push(group.groupname);
        });
    });
    
  }

  onGroupCreate(form: NgForm){
    
    // check who is logged in
      const groupadmins = [];
      const groupassiss = [];

      if (this.userDetails.userRole == "superadmin")
    {
      this.superadmins.forEach(superadmin => {
        groupadmins.push(superadmin.username);
        groupassiss.push(superadmin.username);
      });
    }
    else
    {
      this.superadmins.forEach(superadmin => {
        groupadmins.push(superadmin.username);
        groupassiss.push(superadmin.username);
      });
      groupadmins.push(this.userDetails.username);
      groupassiss.push(this.userDetails.username);
    }
              
      // save new group to the database 
      let newGroup: Group = {groupname: form.value.groupname, groupAdmin: groupadmins, groupAssis: groupassiss};
      this.http.post<{ message: string }>("http://localhost:3000/creategroup", newGroup)
      .subscribe(data => {
          console.log(data.message);
        });
      
      // update user details to match new added group
      const groupname = form.value.groupname;
      const sendData = {groupadmins, groupname}
      this.http.post<{ message: string }>("http://localhost:3000/changegroupusers", sendData)
      .subscribe(data => {
          console.log(data.message);
        });
  }

  editGroup(index){
    // group edit button funtion
    const groupName = this.groups[index];
    this.router.navigate(['/editgroup', groupName]);
  }

  deleteGroup(index){
    //group delete button
    const groupName = {'groupname': this.groups[index]};
    this.http.post<{ message: string }>("http://localhost:3000/deletegroup", groupName)
      .subscribe(data => {
          console.log(data.message);
        });


    this.http.post<{ message: string }>("http://localhost:3000/deletegroupfromusers", groupName)
      .subscribe(data => {
          console.log(data.message);
        });

    this.http.post<{ message: string }>("http://localhost:3000/deletegroupfromchannels", groupName)
      .subscribe(data => {
          console.log(data.message);
        });
  }

}
