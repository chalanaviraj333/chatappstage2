import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable, of } from 'rxjs';

import { Userrolee } from './userrolee';


@Injectable({
  providedIn: 'root'
})
export class UserroleService {

  userrole = '';

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }


  // checkUserRole(){
  //   const username = {username: this.storage.get('loggeduser')};
  //   const userrole = '';

  //   this.http.post<{userrole: Userrole }>("http://localhost:3000/checkuserrole", username).
  //   subscribe(data => {
  //     this.userrole = data.userrole.userRole; 
  //   });
  // }

  // senduserRole(){
  //   return this.userrole;
  // }
}

