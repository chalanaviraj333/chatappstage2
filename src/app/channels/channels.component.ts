import { Component, OnInit, Inject } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgForm } from '@angular/forms';
import { SharedserviceService } from '../sharedservice.service';

import { HttpClient } from '@angular/common/http';
import { Group } from '../group.model';
import { Channel } from '../channel.model';
import { User } from '../user.model';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  groups = [];
  channels: Channel[] = [];
  channelCreate: boolean = true;
  deleteChannel: boolean = true;
  userDetails: User;
  loggeddetails = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,
  private http: HttpClient, private SharedService: SharedserviceService) { }

  ngOnInit() {
 
    // fetching groups that user added in
    this.loggeddetails = {'loggeduser' : this.storage.get('loggeduser')};

    // get logged user details from the database
    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", this.loggeddetails)
    .subscribe(data => {
      this.userDetails = data.loggeduserDetails;
      if (this.userDetails.userRole == 'superadmin')
      { 
        this.channelCreate = false;
        this.deleteChannel = false;
      }
      else if (this.userDetails.userRole == 'groupadmin' || this.userDetails.userRole == 'groupassis')
      {
        this.channelCreate = false;
      }
    });
    
    // get all groups that user is a group assign
    this.http.post<{ message: string; groupListofAssis: [] }>("http://localhost:3000/getgroupsofuserassis", this.loggeddetails)
    .subscribe(groupData => {
      this.groups = groupData.groupListofAssis;

    });


    //get all channels
    this.http.get<{ message: string; channels:Channel[] }>("http://localhost:3000/getallchannels")
    .subscribe(data => {
      this.channels = data.channels;

    });


  }

  onChannelCreate(form: NgForm){  
  
  const newchannel: Channel = {groupname: form.value.groupname, channelname: form.value.channelname};
  this.http.post<{ message: string }>("http://localhost:3000/createchannel", newchannel)
  .subscribe(data => {
    console.log(data.message);
  });


  this.http.post<{ message: string }>("http://localhost:3000/addnewchanneltosuperadmin", newchannel)
  .subscribe(data => {
    console.log(data.message);
  });

  if (this.userDetails.userRole !== 'superadmin')
  {
    const loggedUser = {'username' :this.userDetails.username, 'channelname': form.value.channelname}
  this.http.post<{ message: string }>("http://localhost:3000/addnewchanneltologgeduser", loggedUser)
  .subscribe(data => {
    console.log(data.message);
  });

  }

  }



  //delete channel from the channel list
  onDeleteChannel(index){
  const deleteChannel = {'channelname': this.channels[index].channelname};
  this.http.post<{ message: string }>("http://localhost:3000/deletechannel", deleteChannel)
  .subscribe(data => {
    console.log(data.message);
  });

//delete channel form the user list
  this.http.post<{ message: string }>("http://localhost:3000/deletechannelfromusers", deleteChannel)
  .subscribe(data => {
    console.log(data.message);
  });
  }

}
