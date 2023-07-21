import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ThemeService} from "../../../_services/theme.service";
import {UserService} from "../../../_services/user.service";
import {GameRoomService} from "../../../_services/game-room.service";
import {GameRoomInvitationService} from "../../../_services/game-room-invitation.service";
import {IGameRoom} from "../../../_interfaces/IGameRoom";

@Component({
  selector: 'app-my-game-rooms',
  templateUrl: './my-game-rooms.component.html',
  styleUrls: ['./my-game-rooms.component.css']
})
export class MyGameRoomsComponent implements OnInit {

  currentSection : string = "gameroomsList";
  currentUserPseudo : string | null = null;

  currentTheme : BehaviorSubject<string> = new BehaviorSubject<string>("dark")
  constructor(private themeService : ThemeService,
              private userService : UserService,
              //TODO TEMPORARY (retrieve later)
              private gameRoomService : GameRoomService,
              private gameRoomInvitationService : GameRoomInvitationService,
              ) { }

  ngOnInit(): void {
    this.themeService.getTheme().subscribe(theme => {
      this.currentTheme.next(theme);
    });
    this.initOwner();
  }

  initOwner(){
    this.currentUserPseudo = this.userService.getCurrentUserPseudo();
  }

  // async getAllGameRooms(){
  //   let gameRooms : IGameRoom[] | undefined = await this.gameRoomService.getAll();
  //   console.log("All rooms : " + JSON.stringify(gameRooms));
  // }
  //
  // async getAllGameRoomInvitations(){
  //   let gameRoomInvitations = await this.gameRoomInvitationService.getAll();
  //   console.log("All invitations : " + JSON.stringify(gameRoomInvitations));
  // }
  //
  // async getAllGameRoomInvitationsSentToUser(){
  //   let gameRoomInvitations = await this.gameRoomInvitationService.getAllSentToUser();
  //   console.log("All invitations sent to user : " + JSON.stringify(gameRoomInvitations));
  // }
  //
  // async getAllGameRoomInvitationsSentByUser(){
  //   let gameRoomInvitations = await this.gameRoomInvitationService.getAllSentByUser();
  //   console.log("All invitations sent by user : " + JSON.stringify(gameRoomInvitations));
  // }
  //
  // async getAllMyGameRooms(){
  //   let gameRooms = await this.gameRoomService.getMyRooms()
  //   console.log("All my rooms :" + JSON.stringify(gameRooms));
  // }


}
