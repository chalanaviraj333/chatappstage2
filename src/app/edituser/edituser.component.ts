import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  private editUser: string;
  private userID: number;
  public selected: string;

  constructor(private AuthService: AuthserviceService) { }

  ngOnInit() {
      //this.AuthService.editUserRole();
      var editUserdetails = this.AuthService.editUserRole();
      this.editUser = editUserdetails.username;
      this.selected = editUserdetails.userRole;
      this.userID = editUserdetails.userID;
      console.log(this.selected);


  }

  onChange(form: NgForm){
    this.AuthService.editUserSubmit(this.userID, form.value.userRole);
  }

}
