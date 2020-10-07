import { Component, OnInit, Inject } from '@angular/core';
import { ImguploadService } from '../imgupload.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  selectedFile = null;
  imagepath = "";
  loggedUser: User;
  username = '';
  userpicture = '';
  filename = '';

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private imguploadService: ImguploadService, private http: HttpClient) { }

  ngOnInit() {
    // fetching groups that user added in
    const loggeddetails = {'loggeduser' : this.storage.get('loggeduser')};

    // get logged user details from the database
    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/getloggeduserdetails", loggeddetails)
    .subscribe(data => {
      this.loggedUser = data.loggeduserDetails;
      this.username = this.loggedUser.username;
      this.userpicture = ('assets/img/' + this.loggedUser.userpicture);
      console.log(this.userpicture);
    });


  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.filename = this.selectedFile.name;
  }


  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile,this.selectedFile.name);
    this.imguploadService.imgupload(fd).subscribe(res => {
    });

    const sendData = {username: this.username, filename: this.filename};
    this.http.post<{ message: string; loggeduserDetails: User }>("http://localhost:3000/changeprofilepicture", sendData)
    .subscribe(data => {

    });
    
  }

}
