import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router,
   private AuthService: AuthserviceService) {


   }

  ngOnInit() {

    // this.AuthService.userPermission();

  }

  // onSubmit(form: NgForm) {

  //   this.AuthService.userMessage(form.value.chatMessage);

  // }


}

