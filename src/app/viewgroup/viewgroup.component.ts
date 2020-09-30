import { Component, OnInit, Inject } from '@angular/core';
import { GroupsService } from '../groups.service';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from '../sharedservice.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Channel } from '../channel.model';
import { User } from '../user.model';
import { Usercheck } from '../usercheck';
import { Userrole } from '../userrole';

@Component({
  selector: 'app-viewgroup',
  templateUrl: './viewgroup.component.html',
  styleUrls: ['./viewgroup.component.css']
})
export class ViewgroupComponent implements OnInit {

  usersinGroup: User[] = [];
  usersinChannel: User[] = [];
  channels: Channel[] = [];
  groupName: '';
  groupname = {};
  userRole = '';
  userCheck: Usercheck;
  username = '';
  startchatbuuton: boolean = true;


  constructor(private GroupService: GroupsService, private activatedroute: ActivatedRoute,
    private http: HttpClient, private SharedService: SharedserviceService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) {}

  ngOnInit() {

    // get channellist of the group from the database
    this.activatedroute.params.subscribe(data => {
      this.groupName = data['groupName'];
    });
    this.groupname = {groupname: this.groupName};
      this.http.post<{ message: string; channelsList: Channel[] }>("http://localhost:3000/getGroupChannels", this.groupname)
          .subscribe(data => {
            this.channels = data.channelsList;
          });

    this.activatedroute.params.subscribe(data => {
      this.groupName = data['groupName'];
    });
    this.groupname = {groupname: this.groupName};

    this.username = this.storage.get('loggeduser');
    this.userCheck = {username: this.username, groupname: this.groupName};

    // get userlist of the group from the database
      this.groupname = {groupname: this.groupName};
        this.http.post<{ message: string; usersList: User[] }>("http://localhost:3000/getGroupUsers", this.groupname)
          .subscribe(data => {
            this.usersinGroup = data.usersList;
          });

          

          this.http.post<{ message: string; grouprole: Userrole }>("http://localhost:3000/getGroupRole", this.userCheck)
          .subscribe(data => {
            const admins: Userrole = data.grouprole;
            console.log(admins);
            if (data.grouprole == null)
            {
              this.userRole = 'Group User';
            }
            else
            {
              let admin = false;
              for (let i = 0; i < admins.groupAdmin.length; i++)
              {
                if (admins.groupAdmin[i] == this.username)
                {
                  admin = true;
                }
              }
              if (admin == true)
              {
                this.userRole = 'Group Admin';
              }
              else
              {
                this.userRole = 'Group Assis';
              }
            }  
          });
  }

  tabClick(tab) {

    // get userlist of the channel from the database
    const clickIndex = tab.index;
    const channelname = {'channel': this.channels[clickIndex].channelname};

    this.groupname = {groupname: this.groupName};
    this.storage.set('group', this.groupName);
    this.storage.set('channel', this.channels[clickIndex].channelname);
    this.http.post<{ message: string; usersList: User[] }>("http://localhost:3000/getChannelUsers", channelname)
    .subscribe(data => {
      this.usersinChannel = data.usersList

    this.usersinChannel.forEach(user => {
        if (user.username == this.username)
        {
          this.startchatbuuton = false;
        }
      });
    });

  }

  startChat(){
    this.router.navigateByUrl('/chathistory');
  }

}
