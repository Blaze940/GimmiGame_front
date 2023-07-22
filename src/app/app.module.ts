import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AppResumeCardComponent } from './components/app-resume-card/app-resume-card.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import {UserAPIService} from "./_services/callAPI/userAPI.service";
import { SpinnerComponent } from './components/_tools/spinner/spinner.component';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {TokenService} from "./_services/token.service";
import {UserService} from "./_services/user.service";
import { JwtModule } from '@auth0/angular-jwt';
import {environment} from "../environments/environment";
import { MyFriendsComponent } from './pages/profile/my-friends/my-friends.component';
import { FriendRequestManagementComponent } from './components/friend-request-management/friend-request-management.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { AlertComponent } from './components/_tools/alert/alert.component';
import { FriendRequestReceivedComponent } from './components/friend-request-received/friend-request-received.component';
import { FriendRequestSentComponent } from './components/friend-request-sent/friend-request-sent.component';
import { MyGameRoomsComponent } from './pages/profile/my-game-rooms/my-game-rooms.component';
import { GameRoomListComponent } from './components/game-room-list/game-room-list.component';
import { GameRoomCreateComponent } from './components/game-room-create/game-room-create.component';
import { GameRoomInvitationManagementComponent } from './components/game-room-invitation-management/game-room-invitation-management.component';
import { GameRoomInvitationReceivedComponent } from './components/game-room-invitation-received/game-room-invitation-received.component';
import { GameRoomInvitationSentComponent } from './components/game-room-invitation-sent/game-room-invitation-sent.component';
import { GameRoomComponent } from './pages/game-room/game-room.component';
import { FriendRankingComponent } from './components/friend-ranking/friend-ranking.component';




@NgModule({
  declarations: [
    AppComponent,
    LandpageComponent,
    HeaderComponent,
    AppResumeCardComponent,
    LoginCardComponent,
    LoginComponent,
    RegisterComponent,
    RegisterCardComponent,
    SpinnerComponent,
    MyFriendsComponent,
    MyFriendsComponent,
    FriendRequestManagementComponent,
    FriendListComponent,
    AlertComponent,
    FriendRequestReceivedComponent,
    FriendRequestSentComponent,
    MyGameRoomsComponent,
    GameRoomListComponent,
    GameRoomCreateComponent,
    GameRoomInvitationManagementComponent,
    GameRoomInvitationReceivedComponent,
    GameRoomInvitationSentComponent,
    GameRoomComponent,
    FriendRankingComponent,
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule,ReactiveFormsModule, HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: environment.domain_allowed,
        disallowedRoutes: environment.routes_needingToken,
      }
    })
  ],
  providers: [UserAPIService,TokenService,UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
