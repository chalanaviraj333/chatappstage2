import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

import { HttpClient } from '@angular/common/http';

import { User } from '../user.model';
import { isEmptyExpression } from '@angular/compiler';


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
      this.http.post<{ message: string; validuser: User }>("http://localhost:3000/userlogin",loginData)
      .subscribe(data => {
        if (typeof data.validuser!='undefined' && data.validuser)
        {
          this.storage.set('loggeduser', form.value.username);
          this.router.navigateByUrl('/mainpage');

        }
        else
        {
           alert('Invalid username or password');
        }
      });
  }

}
