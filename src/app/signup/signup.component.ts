import { flatten } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';


import { HttpClient } from '@angular/common/http';

// var userList = [];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userPermission: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService, private http: HttpClient) {

      // userList = this.storage.get("NewUserList");
      // // console.log(userList);


   }

  ngOnInit() {
  }

  async onSignup(form: NgForm) {

    // alert('signed up')
    // let serverresponse = await this.AuthService.userSignup(form.value.username, form.value.email, form.value.userRole, form.value.password);
    // console.log(serverresponse);

    const authData = {username: form.value.username, userRole: form.value.userRole, email: form.value.email, password: form.value.password};
        this.http.post("http://localhost:3000/usersignup", authData)
        .subscribe(response => {
            //console.log(response);
    })
    
    
  }

}
