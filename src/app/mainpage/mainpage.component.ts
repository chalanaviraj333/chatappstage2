import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';
import { GroupsService } from '../groups.service';


import { HttpClient } from '@angular/common/http';
import { Group } from '../group.model';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  groups: Group[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router,
   private AuthService: AuthserviceService, private GroupService: GroupsService, private http: HttpClient) {


   }

  ngOnInit() {

    const loggeduser = this.storage.get('loggeduser');
    const loggeddetails = {loggeduser};
    // this.AuthService.userPermission();
    this.http.post<{ message: string; groupList: Group[] }>("http://localhost:3000/getgroups", loggeddetails)
    .subscribe(groupData => {
      this.groups = groupData.groupList;
    });


    // this.http.post("http://localhost:3000/getgroups", loggeddetails)
    //     .subscribe(response => {
    //         console.log(response);
    // })

  }

  // onSubmit(form: NgForm) {

  //   this.AuthService.userMessage(form.value.chatMessage);

  // }

  viewGroup(index){
    const groupName = this.groups[index].groupname;
    // this.GroupService.navigatetoGroup(groupName);
    this.router.navigate(['/viewgroup', groupName]);
}

  editGroup(index){
    const groupName = this.groups[index].groupname;
    this.router.navigate(['/editgroup', groupName]);
      // this.router.navigateByUrl('/editgroup');
  }


}

