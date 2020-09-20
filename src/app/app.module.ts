import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatSelectModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { StorageServiceModule } from 'angular-webstorage-service';
import { SignupComponent } from './signup/signup.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { AuthserviceService } from './authservice.service';
import { EdituserComponent } from './edituser/edituser.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    SignupComponent,
    MainpageComponent,
    HeaderComponent,
    UsersComponent,
    GroupsComponent,
    ChannelsComponent,
    ChathistoryComponent,
    EdituserComponent,
    EditgroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    StorageServiceModule,
    MatTabsModule
  ],
  providers: [AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
