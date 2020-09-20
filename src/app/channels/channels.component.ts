import { Component, OnInit, Inject } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {


  public groups = [];
  public channels = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService) { }

  ngOnInit() {
    
    this.channels = this.storage.get('channels');
    var groupsArray = this.storage.get('groups');
    groupsArray.forEach( group => {
      this.groups.push({'value': group});
    });
  }

  onChannelCreate(form: NgForm){

    this.AuthService.createChannel(form.value.channelname, form.value.channelGroup);
  }

}
