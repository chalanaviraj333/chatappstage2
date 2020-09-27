import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { GroupsService } from '../groups.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { HttpClient } from '@angular/common/http';

import { Group } from '../group.model';
import { User } from '../user.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,
  private GroupService: GroupsService, private http: HttpClient) { }

  ngOnInit() {
  }

  onGroupCreate(form: NgForm){
    
    // check who is logged in
      const groupadmins = [];
      const loggeduser = this.storage.get('loggeduser');
      if (loggeduser == 'superadmin'){
          groupadmins.push(loggeduser);
      }
      else
      {
        groupadmins.push(loggeduser, 'superadmin');
      }
      
      // save new group to the database 
      let newGroup: Group = {groupname: form.value.groupname, groupAdmin: groupadmins, groupAssis: []};
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


}
