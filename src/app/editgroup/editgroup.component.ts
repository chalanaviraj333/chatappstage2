import { Component, OnInit, Inject } from '@angular/core';
import { GroupsService } from '../groups.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ChannelsService } from '../channels.service';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {

  public channels = [];
  public users = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private GroupService: GroupsService, private ChannelService: ChannelsService) { }

  ngOnInit() {

    this.channels = this.GroupService.getChannelList();
    this.users = this.ChannelService.getUsers();
    this.ChannelService.addedUser();
  }

  addUsers(i, userIndex){
      var channel = this.channels[i].channelname;
      var user = this.users[userIndex].username;
      var userID = this.users[userIndex].userID;
      this.ChannelService.addUser(channel, user, userID);
      
  }
}
