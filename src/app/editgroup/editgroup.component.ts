import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Channel } from '../channel.model';
import { MatDialog } from '@angular/material';
import { UseroptionComponent } from '../useroption/useroption.component';
import { SharedserviceService } from '../sharedservice.service';

import { User } from '../user.model';
import { groupDetails } from '../groupdetails';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {

  channels: Channel[] = [];
  users: User[] = [];
  userList: User[] = [];
  groupDetails: groupDetails[] = [];
  usersnotinGroup = [];
  usersinGroup = [];
  groupname = '';


  constructor(private GroupService: GroupsService, private activatedroute: ActivatedRoute,
    private http: HttpClient, public dialog: MatDialog, private SharedService: SharedserviceService) {}

  ngOnInit() {

    let groupname = '';


    this.activatedroute.params.subscribe(data => {
      this.groupname = data['groupName'];
    });
    const groupName = {groupname};

    // this.GroupService.navigatetoGroup(groupname);

      this.http.post<{ message: string; channelList: Channel[] }>("http://localhost:3000/navigategroup", groupName)
          .subscribe(channelsData => {
            this.channels = channelsData.channelList;
            // console.log(this.channels);
          });


      // this.http.get<{ message: string; users: User[] }>("http://localhost:3000/getusers")
      // .subscribe(userData => {
      //     this.users = userData.users;
          
      // });

      // this.http.get<{ message: string; groupDetails: groupDetails[] }>("http://localhost:3000/getgroupDetails")
      // .subscribe(userData => {
      //     this.groupDetails = userData.groupDetails;
      // });

      this.http.get<{ message: string; users: User[] }>("http://localhost:3000/getusers")
      .subscribe(userData => {
          this.users = userData.users;
          this.userList = this.users;

          this.http.get<{ message: string; groupDetails: groupDetails[] }>("http://localhost:3000/getgroupDetails")
      .subscribe(userData => {
          this.groupDetails = userData.groupDetails;


          this.users.forEach(user => {
            this.groupDetails.forEach(groupDetail => {
              if (user.userID == groupDetail.userID)
              {
                this.usersinGroup.push(groupDetail);
                this.userList.splice(this.userList.indexOf(user), 1);
                console.log(this.users);
              }
              this.usersnotinGroup.push(user);
              // console.log(this.usersnotinGroup);
            });
          });
      });

        

      });
      
      // this.users.forEach(user => {
      //   this.groupDetails.forEach(groupDetail => {
      //     if (user.userID == groupDetail.userID)
      //     {
      //         this.usersnotinGroup.push(groupDetail);
      //     }
      //     else
      //     {
      //       this.usersinGroup.push(groupDetail);
      //     }
      //     console.log(this.usersinGroup);
      //   });
      // });
      // console.log(this.usersnotinGroup);
      
    };

    openDialog(userIndex): void {

      const buildGroupDetails: groupDetails = {userID: this.users[userIndex].userID, username:this.users[userIndex].username, 
        userRole: this.users[userIndex].userRole, groupname: this.groupname };
      // this.groupDetails = this.users[userIndex].username;
      // console.log(buildGroupDetails);
      this.SharedService.sendData(buildGroupDetails);
      const dialogRef = this.dialog.open(UseroptionComponent, {
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }


}