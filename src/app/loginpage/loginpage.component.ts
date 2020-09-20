import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})

export class LoginpageComponent implements OnInit {


  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private AuthService: AuthserviceService) {



   }

  ngOnInit() {

  }
  

  onLogin(form: NgForm) {
 

      this.AuthService.userLogin(form.value.username, form.value.password);
      
  }

}






   // var loginValue = form.value;
    // var loginUsername = loginValue.username;
    // var loginPassword = loginValue.password;
    // var validUser = "invalid";
    // var loggedUser: number;


    // userList.forEach(user => {
    //   if (loginUsername == user.username && loginPassword == user.password) {
    //     validUser = "valid";
    //     loggedUser = user.userID;
    //     var loggedUserID = user.userID;
    //     var loggeduserName = user.username;
    //     var loguser = {loggedUserID, loggeduserName};
    //     console.log(loguser);

    //     // this._GetusernameService.addUser(loguser);

    //   }
    // });

    // if (validUser == "valid")
    // {
    //   this.router.navigate(['mainpage', loggedUser]);
    // }
    // else {
    //   alert("Invalid User");
    // }