import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})

export class LoginpageComponent implements OnInit {


  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private AuthService: AuthserviceService,
  private http: HttpClient) {



   }

  ngOnInit() {

  }
  

  onLogin(form: NgForm) {
 

      // this.AuthService.userLogin(form.value.username, form.value.password);
      if (form.invalid) {
        return;
    }
      const loginData = {username: form.value.username, password: form.value.password};
      this.http.post<{ message: string; validuser: boolean }>("http://localhost:3000/userlogin",loginData)
      .subscribe(response => {
        const validuser = response.validuser;
          if ( validuser == true)
          {
            this.storage.set('loggeduser', form.value.username);
            this.router.navigateByUrl('/mainpage');
            
            
          }
          else
          {
            alert('Invalid username or password');
            console.log(response);
          }
      });
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