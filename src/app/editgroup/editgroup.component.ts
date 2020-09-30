import { Component, OnInit, Inject } from '@angular/core';
import { GroupsService } from '../groups.service';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material';
import { UseroptionComponent } from '../useroption/useroption.component';
import { RemoveuserfromgroupComponent } from '../removeuserfromgroup/removeuserfromgroup.component';
import { SharedserviceService } from '../sharedservice.service';

import { User } from '../user.model';
import { Channel } from '../channel.model';
import { RemoveuserchannelComponent } from '../removeuserchannel/removeuserchannel.component';
import { AddusertochannelComponent } from '../addusertochannel/addusertochannel.component';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {

  channels: Channel[] = [];
  usersinGroup: User[] = [];
  usersnotinGroup: User[] = [];
  usersinChannel: User[] = [];
  usersnotinChannel: User[] = [];
  groupName: '';
  channelname = {};
  groupname = {};
  deletechannel = '';
  userRole = '';
  addgroupbutton: boolean = false;
  removegroupbutton: boolean = false;

  constructor(private GroupService: GroupsService, private activatedroute: ActivatedRoute,
    private http: HttpClient, public dialog: MatDialog, private SharedService: SharedserviceService,@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  ngOnInit() {

    //check loggeduser role
    const loggeduser = this.storage.get('loggeduser');
    const loggeddetails = {loggeduser};


    // get channellist of the group from the database
    this.activatedroute.params.subscribe(data => {
      this.groupName = data['groupName'];
    });
    this.groupname = {groupname: this.groupName};
      this.http.post<{ message: string; channelsList: Channel[] }>("http://localhost:3000/getGroupChannels", this.groupname)
          .subscribe(data => {
            this.channels = data.channelsList;
          });
    

    // get userlist of the group from the database
    this.groupname = {groupname: this.groupName};
      this.http.post<{ message: string; usersList: User[] }>("http://localhost:3000/getGroupUsers", this.groupname)
          .subscribe(data => {
            this.usersinGroup = data.usersList;
          });
    

    // get users who not in the group from the database
    this.groupname = {groupname: this.groupName};
      this.http.post<{ message: string; usersList: User[] }>("http://localhost:3000/getGroupUsersnotin", this.groupname)
          .subscribe(data => {
            this.usersnotinGroup = data.usersList;
          });

    //check logged users user role
    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
    .subscribe(data => {
      const userdetails: User = data.loggeduserDetails;
      this.userRole = userdetails.userRole;
      

      if (this.userRole == 'groupassis')
      {
        this.addgroupbutton = true;
        this.removegroupbutton = true;
      }
    });
    
      
  }

    // open dialog box funtion to add a user to the group
    openDialogAdd(userIndex): void {
        
      const addingUser = {username: this.usersnotinGroup[userIndex], groupname: this.groupName};
      this.SharedService.sendData(addingUser);
      const dialogRef = this.dialog.open(UseroptionComponent, {
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }

    // open dialog box funtion to remove a user to the group
    openDialogRemove(userIndex): void {
      const removingUser = {username: this.usersinGroup[userIndex], groupname: this.groupName};
      this.SharedService.sendData(removingUser);
      const dialogRef = this.dialog.open(RemoveuserfromgroupComponent, {
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }

 
    tabClick(tab) {

    // get userlist of the channel from the database
    const clickIndex = tab.index;
    this.channelname = {'channel': this.channels[clickIndex].channelname};
    this.deletechannel = this.channels[clickIndex].channelname;

    this.groupname = {groupname: this.groupName};
    this.http.post<{ message: string; usersList: User[] }>("http://localhost:3000/getChannelUsers", this.channelname)
    .subscribe(data => {
      this.usersinChannel = data.usersList;
      let newArray = [];
      let newArray2 = [];
      this.usersinChannel.forEach(user => {
        newArray.push(user.username);
      });
      this.usersinGroup.forEach(user => {
        newArray2.push(user.username);
      });
      this.usersnotinChannel = newArray2.filter(item => newArray.indexOf(item) < 0); 
      
    });
    
    }

    openDialogRemoveFromChannel(userIndex): void {

      const removingUser = {username: this.usersinChannel[userIndex], channelname: this.deletechannel};
      this.SharedService.sendDeleteChannel(removingUser);
      const dialogRef = this.dialog.open(RemoveuserchannelComponent, {
      });
  
      dialogRef.afterClosed().subscribe(result => {});
    }


    openDialogAddtoChannel(userIndex): void {

      const addingUser = {username: this.usersnotinChannel[userIndex], channelname: this.deletechannel};
      this.SharedService.sendAddingChannel(addingUser);
      const dialogRef = this.dialog.open(AddusertochannelComponent, {
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }

}
