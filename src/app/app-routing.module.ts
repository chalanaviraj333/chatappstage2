import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { ViewgroupComponent } from './viewgroup/viewgroup.component';
import { EdituserroleComponent } from './edituserrole/edituserrole.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { MyprofileComponent } from './myprofile/myprofile.component';


const routes: Routes = [
  {path: '', component: LoginpageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'mainpage/:userID', component: MainpageComponent},
  {path: 'mainpage', component: MainpageComponent},
  {path: 'myprofile', component: MyprofileComponent},
  {path: 'users', component: UsersComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'edituser/:userName', component: EdituserComponent},
  {path: 'editgroup/:groupName', component: EditgroupComponent},
  {path: 'viewgroup/:groupName', component: ViewgroupComponent},
  {path: 'edituserrole', component: EdituserroleComponent},
  {path: 'chathistory', component:ChathistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
