import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Channel } from './channel.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  public groupID: number;
  public GroupName: string;
  channels: Channel[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router,
  private http: HttpClient) { }

//   editGroup(index: number){
//     this.groupID = index;
//     var groups = this.storage.get('groups');
//     this.GroupName = groups[index];
//     this.router.navigateByUrl('/editgroup');
    
//   }

//   // getChannelList(){
//   //   return this.GroupName;
//   // }


//   getChannelList(){
//     var channelList = this.storage.get('channels');
//     channelList.forEach(channel => {
//       if (channel.channelGroup == this.GroupName){
//           this.channels.push(channel);
//       }
//     });
//     return this.channels;
    
// }

  // navigatetoGroup(groupName: string){
  //   const groupNam = {groupName};
  //   this.http.post<{ message: string; channelList: Channel[] }>("http://localhost:3000/navigategroup", groupNam)
  //       .subscribe(channelsData => {
  //         this.channels = channelsData.channelList;
  //         console.log(this.channels);
  //       });
  // };
  

}


  