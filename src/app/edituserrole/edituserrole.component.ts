import { Component, OnInit, Inject } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { Usercheck } from '../usercheck';
import { Userrole } from '../userrole';
import { User } from '../user.model';

@Component({
  selector: 'app-edituserrole',
  templateUrl: './edituserrole.component.html',
  styleUrls: ['./edituserrole.component.css']
})
export class EdituserroleComponent implements OnInit {

  message = '';
  username = '';
  grouprole = '';
  AssisbuttonDisabled: boolean = false;
  AdminbuttonDisabled: boolean = false;
  userCheck: Usercheck;
  userRole = '';

  constructor(private SharedService: SharedserviceService, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.message = this.SharedService.getedituserdetailsmessage();
    this.userCheck = this.SharedService.getedituserdetails();
    this.username = this.userCheck.username;

    const loggeddetails = {'loggeduser': this.storage.get('loggeduser')};

    this.http.post<{ message: string; grouprole: Userrole }>("http://localhost:3000/getGroupRole", this.userCheck)
      .subscribe(data => {
        const admins: Userrole = data.grouprole;
        if (data.grouprole == null)
        {
          this.grouprole = 'Group User';
        }
        else
        {
          this.grouprole = 'Group Assis';
          this.AssisbuttonDisabled = true;
          for (let i = 0; i < admins.groupAdmin.length; i++)
          {
            if (admins.groupAdmin[i] == this.username)
            {
              this.grouprole = 'Group Admin';
              this.AdminbuttonDisabled = true;
            }
          }
        }
        


      });

      //check logged users user role
      this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
      .subscribe(data => {
        const userdetails: User = data.loggeduserDetails;
        this.userRole = userdetails.userRole;
      });
  }


  groupadminButton(){
    if (this.message == "is not in the Group")
    {
      this.http.post<{ message: string}>("http://localhost:3000/addnewgrouptouser", this.userCheck)
      .subscribe(data => {
        console.log(data.message);
      })
    }


    this.http.post<{ message: string}>("http://localhost:3000/upgradetoagroupadmin", this.userCheck)
      .subscribe(data => {
        console.log(data.message);
      })

    this.http.post<{ message: string}>("http://localhost:3000/upgradetoagroupassis", this.userCheck)
      .subscribe(data => {
        console.log(data.message);
      })

      this.http.post<{ message: string}>("http://localhost:3000/changeusersroletoadmin", this.userCheck)
      .subscribe(data => {
        console.log(data.message);
      })
  }


  groupassisButton(){
    if (this.grouprole == 'Group User')
    {
       this.http.post<{ message: string}>("http://localhost:3000/changeusersroletoassis", this.userCheck)
       .subscribe(data => {
         console.log(data.message);
        });
    }

    if (this.message == "is not in the Group")
    {
      this.http.post<{ message: string}>("http://localhost:3000/addnewgrouptouser", this.userCheck)
      .subscribe(data => {
        console.log(data.message);
      })
    }

    this.http.post<{ message: string}>("http://localhost:3000/upgradetoagroupassis", this.userCheck)
      .subscribe(data => {
        console.log(data.message);
      })

  }

}
