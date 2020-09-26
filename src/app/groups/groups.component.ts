import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { GroupsService } from '../groups.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { HttpClient } from '@angular/common/http';
import { Group } from '../group.model';

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

    // this.http.get<{ message: string; groups: Group[] }>("http://localhost:3000/getgroups")
    // .subscribe(groupData => {
    //   this.groups = groupData.groups;
    //   console.log(this.groups);
    // });

    // this.groups = this.storage.get('groups');
  }

  onGroupCreate(form: NgForm){
      // this.AuthService.createGroup(form.value.groupname);
      const groupadmin = [this.storage.get('loggeduser'), 'superadmin'];
      const newGroup = {groupname: form.value.groupname, groupAdmin: groupadmin};
      this.http.post("http://localhost:3000/creategroup", newGroup)
      .subscribe(response => {
          //console.log(response);
        })
  }


}
