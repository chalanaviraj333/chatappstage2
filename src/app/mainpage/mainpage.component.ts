import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';
import { GroupsService } from '../groups.service';
import { SharedserviceService } from '../sharedservice.service';
import { UserroleService } from '../userrole.service';


import { HttpClient } from '@angular/common/http';
import { Group } from '../group.model';
import { User } from '../user.model';
import { group } from 'console';
import { Userrolee } from '../userrolee';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  // groups: Group[] = [];
  groups = [];
  // groupofAdmin = [];
  username = '';
  editbuttonDisabled: boolean = true;
  deletebuttonDisabled: boolean = true;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router,
   private AuthService: AuthserviceService, private GroupService: GroupsService, private http: HttpClient, private SharedService: SharedserviceService, private UserroleService: UserroleService) {


   }

  ngOnInit() {

    const loggeddetails = {'loggeduser': this.storage.get('loggeduser')};
    this.username = this.storage.get('loggeduser');
    //get groups that user added in
    this.http.post<{ message: string; groupList: User }>("http://localhost:3000/getgroupsofuseradd", loggeddetails)
    .subscribe(data => {
      this.groups = data.groupList.groups;

    });

  }

  viewGroup(index){
    // group view button funtion
    const groupName = this.groups[index];
    this.router.navigate(['/viewgroup', groupName]);
}

  editGroup(index){
    // group edit button funtion
    const groupName = this.groups[index];
    this.router.navigate(['/editgroup', groupName]);
  }

  deleteGroup(index){
    // group delete button funtion
    const groupname = this.groups[index];
    const groupnameID = {groupname};
    this.http.post<{message: string}>("http://localhost:3000/deletegroups", groupnameID)
    .subscribe(data => {
      console.log(data.message);
    });

    this.http.post<{message: string}>("http://localhost:3000/deletegroupsfromusers", groupnameID)
    .subscribe(data => {
      console.log(data.message);
    });
  }


}

