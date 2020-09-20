import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  public userDetailList = [];
  public users = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  getUsers(){
      this.users = this.storage.get('userList');
      return(this.users);
  }

  addUser(channel: string, user: string, userID: number){
    this.userDetailList = this.storage.get('userDetailsList');
    const newUser: {} = {channel, user, userID};
    this.userDetailList.push(newUser);
    this.storage.set('userDetailsList', this.userDetailList);
  }

  addedUser(){
    this.users.forEach(user => {
      this.userDetailList.forEach(channel => {
        console.log(user.userID);
        // if (user.userID == channel.userID){
        // }
      });

    });
  }
}
