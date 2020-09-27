import { Component, OnInit, Inject } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgForm } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Group } from '../group.model';
import { Channel } from '../channel.model';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {


  groups: Group[] = [];
  channels: Channel[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,
  private http: HttpClient) { }

  ngOnInit() {
    
    const loggeduser = this.storage.get('loggeduser');
    const loggeddetails = {loggeduser};
    this.http.post<{ message: string; groupList: Group[] }>("http://localhost:3000/getgroups", loggeddetails)
    .subscribe(groupData => {
      this.groups = groupData.groupList;
    });

    
    this.http.get<{ message: string; channels: Channel[] }>("http://localhost:3000/getchannels")
    .subscribe(channelData => {
      this.channels = channelData.channels;
    });


  }

  onChannelCreate(form: NgForm){
    
  const newChannel = {groupname: form.value.groupname, channelname: form.value.channelname};
  console.log(newChannel);
  this.http.post("http://localhost:3000/createchannel", newChannel)
  .subscribe(response => {
      //console.log(response);
  })



  }

}
