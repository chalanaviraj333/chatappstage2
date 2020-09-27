import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Channel } from '../channel.model';
import { MatDialog } from '@angular/material';
import { UseroptionComponent } from '../useroption/useroption.component';
import { RemoveuserfromgroupComponent } from '../removeuserfromgroup/removeuserfromgroup.component';
import { SharedserviceService } from '../sharedservice.service';

import { User } from '../user.model';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {

  channels: Channel[] = [];
  usersinGroup: User[] = [];
  usersnotinGroup: User[] = [];
  groupName: '';
  groupname = {};


  constructor(private GroupService: GroupsService, private activatedroute: ActivatedRoute,
    private http: HttpClient, public dialog: MatDialog, private SharedService: SharedserviceService) {}

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
    

    // get userlist of the group from the database
    this.activatedroute.params.subscribe(data => {
      this.groupName = data['groupName'];
    });
    this.groupname = {groupname: this.groupName};
      this.http.post<{ message: string; usersList: User[] }>("http://localhost:3000/getGroupUsers", this.groupname)
          .subscribe(data => {
            this.usersinGroup = data.usersList;
          });
    

    // get users who not in the group from the database
    this.activatedroute.params.subscribe(data => {
      this.groupName = data['groupName'];
    });
    this.groupname = {groupname: this.groupName};
      this.http.post<{ message: string; usersList: User[] }>("http://localhost:3000/getGroupUsersnotin", this.groupname)
          .subscribe(data => {
            this.usersnotinGroup = data.usersList;
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


}
