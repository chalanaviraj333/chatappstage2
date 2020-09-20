import { flatten } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';

// var userList = [];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userPermission: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService) {

      // userList = this.storage.get("NewUserList");
      // // console.log(userList);


   }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    this.AuthService.userSignup(form.value.username, form.value.email, form.value.userRole, form.value.password);

    
    
  }

}
