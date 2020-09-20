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


const routes: Routes = [
  {path: '', component: LoginpageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'mainpage/:userID', component: MainpageComponent},
  {path: 'mainpage', component: MainpageComponent},
  {path: 'users', component: UsersComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'edituser', component: EdituserComponent},
  {path: 'editgroup', component: EditgroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
