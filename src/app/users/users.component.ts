import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

import { User } from '../user.model';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  deleteuserbutton: boolean = true;
  edituserbutton: boolean = true;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,
  private router: Router, private http: HttpClient) {


   }

  ngOnInit() {

    const loggeddetails = {'loggeduser': this.storage.get('loggeduser')};

    // get all users from the database
    this.http.get<{ message: string; users: User[] }>("http://localhost:3000/getusers")
    .subscribe(userData => {
      this.users = userData.users;
    });
    
    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
    .subscribe(data => {
      const userDetails: User = data.loggeduserDetails;

      if (userDetails.userRole == 'superadmin')
      {
        this.deleteuserbutton = false;
        this.edituserbutton = false;
      }
      else if (userDetails.userRole == 'groupadmin')
      {
        this.edituserbutton = false;
      }
    });


  }

  deleteUser(index){
    const deleteusername = {'deleteuser': this.users[index].username};
    console.log(deleteusername)
    this.http.post<{ message: string }>("http://localhost:3000/deleteuser", deleteusername)
    .subscribe(data => {
      console.log(data.message);
    });

    this.http.post<{ message: string }>("http://localhost:3000/deleteuserfromgroups", deleteusername)
    .subscribe(data => {
      console.log(data.message);
    });

    this.http.post<{ message: string }>("http://localhost:3000/deleteuserfromchannels", deleteusername)
    .subscribe(data => {
      console.log(data.message);
    });
    
  }

  editUser(index){
    // user edit button funtion
    const userName = this.users[index].username;
    this.router.navigate(['/edituser', userName]);
    
  }

}
