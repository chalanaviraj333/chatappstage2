import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';
import { NgForm } from '@angular/forms';

import io from 'socket.io-client';

import { HttpClient } from '@angular/common/http';

const socket = io('http://localhost:3000');

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
})


export class ChathistoryComponent implements OnInit {

  channel = '';
  group = '';
  username = '';
  chats = []; 

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService, private http: HttpClient) { 


  }

  ngOnInit() {
      this.channel = this.storage.get('channel');
      this.group = this.storage.get('group');
      this.username = this.storage.get('loggeduser');

      const chatDetails = {channelname: this.channel, groupname: this.group};

      socket.emit('sendMessage', chatDetails);


      socket.on('chatmessage1', (res) => {
        
        this.chats = res;
      });

      

  }

  onSubmit(form: NgForm) {
    //save new chat to the database 
    let newChat = {channelname: this.channel, groupname: this.group, username: this.username, chatmessage: form.value.chatMessage};
    this.http.post<{ message: string }>("http://localhost:3000/createchat", newChat)
    .subscribe(data => {
        console.log(data.message);
      });

  }

}
