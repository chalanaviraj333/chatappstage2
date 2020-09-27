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

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,
  private router: Router, private http: HttpClient) {


   }

  ngOnInit() {

    // get all users from the database
    this.http.get<{ message: string; users: User[] }>("http://localhost:3000/getusers")
    .subscribe(userData => {
      this.users = userData.users;
    });


  }

  deleteUser(index){
    const deleteuser = this.users[index].userID;
    const deleteuserID = {deleteuser};
    this.http.post<{ message: string }>("http://localhost:3000/deleteuser", deleteuserID)
    .subscribe(data => {
      console.log(data.message);
    });
    
  }

  editUser(index){
    this.AuthService.editUser(index);
    this.router.navigateByUrl('/edituser');
    
  }

}
