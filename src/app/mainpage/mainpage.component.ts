import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';
import { GroupsService } from '../groups.service';


import { HttpClient } from '@angular/common/http';
import { Group } from '../group.model';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  groups: Group[] = [];
  username = '';

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router,
   private AuthService: AuthserviceService, private GroupService: GroupsService, private http: HttpClient) {


   }

  ngOnInit() {

    //get groups that user added in
    this.username = this.storage.get('loggeduser');
    const loggeduser = this.storage.get('loggeduser');
    const loggeddetails = {loggeduser};
    this.http.post<{ message: string; groupList: Group[] }>("http://localhost:3000/getgroups", loggeddetails)
    .subscribe(data => {
      this.groups = data.groupList;
    });


  }

  viewGroup(index){
    // group view button funtion
    const groupName = this.groups[index].groupname;
    this.router.navigate(['/viewgroup', groupName]);
}

  editGroup(index){
    // group edit button funtion
    const groupName = this.groups[index].groupname;
    this.router.navigate(['/editgroup', groupName]);
  }

  deleteGroup(index){
    // group delete button funtion
    const groupname = this.groups[index].groupname;
    const groupnameID = {groupname};
    this.http.post<{message: string}>("http://localhost:3000/deletegroups", groupnameID)
    .subscribe(data => {
      console.log(data.message);
    });
  }


}

