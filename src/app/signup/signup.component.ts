import { flatten } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';


import { HttpClient } from '@angular/common/http';

import { User } from '../user.model';

// var userList = [];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userPermission: boolean;
  user:User[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService, 
  private http: HttpClient) {}

  ngOnInit() {
  }

 onSignup(form: NgForm) {

    const userID = this.storage.get('userCount') + 1;

    // alert('signed up')
    // let serverresponse = await this.AuthService.userSignup(form.value.username, form.value.email, form.value.userRole, form.value.password);
    // console.log(serverresponse);

    const authData = {userID, username: form.value.username, userRole: form.value.userRole, email: form.value.email, password: form.value.password};
        this.http.post("http://localhost:3000/usersignup", authData)
        .subscribe(response => {
            //console.log(response);
    })

    this.storage.set('userCount', userID+1);
    
    
  }

}
