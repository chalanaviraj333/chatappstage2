import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Channel } from '../channel.model';

@Component({
  selector: 'app-viewgroup',
  templateUrl: './viewgroup.component.html',
  styleUrls: ['./viewgroup.component.css']
})
export class ViewgroupComponent implements OnInit {

  channels: Channel[] = [];


  constructor(private GroupService: GroupsService, private activatedroute: ActivatedRoute,
    private http: HttpClient) { 

    
  

  }

  ngOnInit() {

    let groupname = '';


    this.activatedroute.params.subscribe(data => {
      groupname = data['groupName'];
    });
    const groupName = {groupname};

    // this.GroupService.navigatetoGroup(groupname);

      this.http.post<{ message: string; channelList: Channel[] }>("http://localhost:3000/navigategroup", groupName)
          .subscribe(channelsData => {
            this.channels = channelsData.channelList;
            console.log(this.channels);
          });
    };


}
