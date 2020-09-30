import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HttpClient } from '@angular/common/http';

import { SharedserviceService } from '../sharedservice.service';

import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userRole = ''; 
  users = [];
  userDetails: User;
  createuserbutton: boolean = true;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, 
  private http: HttpClient, private SharedService: SharedserviceService) {}

  ngOnInit() {

      // get logged user details for button validation
      const loggeddetails = {'loggeduser': this.storage.get('loggeduser')};
      this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
      .subscribe(data => {
        const userDetails: User = data.loggeduserDetails;
  
        if (userDetails.userRole == 'superadmin')
        {
          this.createuserbutton = false;
        
        }
      });

      // get all users from the database
    this.http.get<{ message: string; users: User[] }>("http://localhost:3000/getusers")
    .subscribe(userData => {
      const usersList: User[] = userData.users;
      usersList.forEach(user => {
        this.users.push(user.username);
      });
      console.log(this.users);
    });

  }

 onSignup(form: NgForm) {

  let duplicateUser: boolean = false;

  for (let i = 0; i < this.users.length; i++)
    {
      if (this.users[i] == form.value.username)
      {
        duplicateUser = true;
      }

    }

    if (duplicateUser == true)
    {
      alert('Username taken. Please type a different one');
    }
    else 
    {
        const userID = this.storage.get('userCount') + 1;
        let user: User = {userID: userID, username: form.value.username, userRole: 'groupuser', email: form.value.email, password: form.value.password, groups: [], channels: []};
        this.http.post<{ message: string }>("http://localhost:3000/usersignup", user)
        .subscribe(data => {
          console.log(data.message);
        });
    
        this.storage.set('userCount', userID+1);
    }

    
    
  }

}
