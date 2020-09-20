import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private AuthService: AuthserviceService,
  private router: Router) {


   }

  ngOnInit() {

    this.users = this.storage.get('userList');


  }

  deleteUser(index){
    this.AuthService.deleteUser(index);
  }

  editUser(index){
    this.AuthService.editUser(index);
    this.router.navigateByUrl('/edituser');
    
  }

}
