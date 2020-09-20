import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
})


export class ChathistoryComponent implements OnInit {


  public chats = [];
  

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService) { 


  }

  ngOnInit() {

    this.AuthService.userPermission();

    this.chats = this.storage.get('newChatList');
    // this.AuthService.chatHistory();
    
  }

  onSubmit(form: NgForm) {

    this.AuthService.userMessage(form.value.chatMessage);

  }

}
