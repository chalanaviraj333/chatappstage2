import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatSelectModule, MatListModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
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
import { ViewgroupComponent } from './viewgroup/viewgroup.component';
import { UseroptionComponent } from './useroption/useroption.component';
import { RemoveuserfromgroupComponent } from './removeuserfromgroup/removeuserfromgroup.component';


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
    EditgroupComponent,
    ViewgroupComponent,
    UseroptionComponent,
    RemoveuserfromgroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    StorageServiceModule,
    MatTabsModule,
    MatDialogModule
  ],

  entryComponents: [UseroptionComponent, RemoveuserfromgroupComponent],
  providers: [AuthserviceService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
