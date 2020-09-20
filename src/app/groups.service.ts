import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ChannelList } from './channel-list';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  public groupID: number;
  public GroupName: string;
  public channels = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }

  editGroup(index: number){
    this.groupID = index;
    var groups = this.storage.get('groups');
    this.GroupName = groups[index];
    this.router.navigateByUrl('/editgroup');
    
  }

  // getChannelList(){
  //   return this.GroupName;
  // }


  getChannelList(){
    var channelList = this.storage.get('channels');
    channelList.forEach(channel => {
      if (channel.channelGroup == this.GroupName){
          this.channels.push(channel);
      }
    });
    return this.channels;
    
}
}


  