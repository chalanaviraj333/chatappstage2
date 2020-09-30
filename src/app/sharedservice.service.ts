import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { Usercheck } from './usercheck';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  userandgroupdetails = {};
  userRole = '';
  userCheck: Usercheck;
  message = '';
  userandchanneldetails = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  sendData(addingUser: object){
    this.userandgroupdetails = addingUser;

  }

  getData(){
    return this.userandgroupdetails;
  }


  sendDeleteChannel(removingUser: object){
    this.userandchanneldetails = removingUser;
  }

  sendAddingChannel(addingUser: object){
    this.userandchanneldetails = addingUser;

  }

  getDeleteChannel(){
    return this.userandchanneldetails;
  }

  // sendUserRole(userrole: string){
  //   this.userRole = userrole;
  //   this.storage.set('userRole', this.userRole)
  // }

  // getUserRole(){
  //   this.userRole = this.storage.get('userRole');
  //   return this.userRole;
  // }

  sendedituserdetails(userCheck: Usercheck, message: string){
    this.userCheck = userCheck;
    this.message = message;
  }

  getedituserdetailsmessage(){
    return this.message;
  }

  getedituserdetails(){
    return this.userCheck;
  }



}

