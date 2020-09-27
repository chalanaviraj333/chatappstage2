import { flatten } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';


import { HttpClient } from '@angular/common/http';

import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService, 
  private http: HttpClient) {}

  ngOnInit() {
  }

 onSignup(form: NgForm) {

    const userID = this.storage.get('userCount') + 1;
    let user: User = {userID: userID, username: form.value.username, userRole: 'null', email: form.value.email, password: form.value.password, groups: [], channels: []};
        this.http.post<{ message: string }>("http://localhost:3000/usersignup", user)
        .subscribe(data => {
            console.log(data.message);
    })

    this.storage.set('userCount', userID+1);
    
    
  }

}
