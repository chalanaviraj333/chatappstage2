import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Key } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private validUserDetails: string;
  private validUserRole: string;
  public chatList = [];
  public userList = [];
  public groupList = [];
  public channelList = [];
  public editUserIndex: number;

  
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private http: HttpClient) {}

    userLogin(username: string, password: string) {
    var userList = [];
    userList = this.storage.get("userList");
      

      userList.forEach(user => {
        if (username == user.username && password == user.password) {
          this.validUserDetails = user.username;
          this.validUserRole = user.userRole;
          this.router.navigateByUrl('/mainpage');
        }
       });

       //console.log(this.validUserDetails);
    }
    
    


    userMessage(chatMessage: string){

      this.chatList = this.storage.get('newChatList');

      var chatUser = this.validUserDetails;
      const userMessage: {} = {chatUser, chatMessage};

      this.chatList.push(userMessage);
      console.log(this.chatList);
      this.storage.set('newChatList', this.chatList);
    }

    userSignup(username: string, email: string, userRole: string, password: string){

      // var userID = this.storage.get('userCount') + 1;

      // this.userList = this.storage.get('userList');
      // const newUser = {username, email, userRole, password, userID};
      // this.userList.push(newUser);
      // this.storage.set('userList', this.userList);
      // this.storage.set('userCount', userID+1);

    //     const authData = {username: username, userRole: userRole, email: email, password: password};
    //     this.http.post("http://localhost:3000/usersignup", authData)
    //     .subscribe(response => {
    //         // console.log(response);
    //         return (response);
    // })


    }



    createGroup(groupname: string){
        this.groupList = this.storage.get('groups');
        this.groupList.push(groupname);
        this.storage.set('groups', this.groupList);
    }

    createChannel(channelname: string, channelGroup: string){
      this.channelList = this.storage.get('channels');
      this.channelList.push({channelname, channelGroup});
      this.storage.set('channels', this.channelList);
  }
   

  userPermission(){
    if (this.validUserRole != null){
      console.log("valid user logged in");
      if (this.validUserRole == "superAdmin"){
          console.log("suepr admin loggedin");
      }
    }
    else{
      console.log("user not logged in.......")
    }
  }


  deleteUser(index: number){
      var userID = index
      this.userList = this.storage.get('userList');
      this.userList.splice(userID, 1);
      this.storage.set('userList', this.userList);
  }

  deleteGroup(){

  }

  deleteChannel(){

  }

  editUser(index: number){
    this.editUserIndex = index;
  }

  editUserRole(){
    this.userList = this.storage.get('userList');
    var editusername = this.userList[this.editUserIndex];
    // console.log(editusername);
    return editusername;

  }

  editUserSubmit(userID: Number, userRole: String){
    this.userList = this.storage.get('userList');
    this.userList.forEach(user => {
      if (userID == user.userID){
        const username = user.username;
        const email = user.email;
        // this.storage.remove(Key: 'chalana')

      }
    });
      
  }
  

}
