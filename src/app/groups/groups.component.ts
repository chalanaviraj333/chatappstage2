import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { GroupsService } from '../groups.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,
  private GroupService: GroupsService) { }

  ngOnInit() {

    this.groups = this.storage.get('groups');
  }

  onGroupCreate(form: NgForm){
      this.AuthService.createGroup(form.value.groupname);
  }

  editGroup(index){
    this.GroupService.editGroup(index);
  }

}
