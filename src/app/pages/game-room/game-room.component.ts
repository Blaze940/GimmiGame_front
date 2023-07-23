import {Component, OnInit} from '@angular/core';
import {IGameRoom} from "../../_interfaces/IGameRoom";
import {Router} from "@angular/router";
import {GameRoomService} from "../../_services/game-room.service";
import {UserService} from "../../_services/user.service";
import {ThemeService} from "../../_services/theme.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {

  gameRooms : IGameRoom[] | undefined = undefined;
  players : { _id : string, pseudo : string }[] | undefined = undefined;
  gameRoomsNumber : number = 0;


  currentTheme : BehaviorSubject<string> = new BehaviorSubject<string>("dark")

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;

  constructor(
    private router: Router,
    private gameRoomService : GameRoomService,

    private userService : UserService,
    private themeService : ThemeService,

  ) { }

  ngOnInit(): void {
    this.initGameRoomAttributes()
    this.themeService.getTheme().subscribe(theme => {
      this.currentTheme.next(theme);
    });
  }

  private async initGameRoomAttributes() {
    this.loadingSpinner = true;
    try{
      this.gameRooms = await this.gameRoomService.getMyRooms()
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération des salles de jeu. Veuillez réessayer plus tard."
    }

    this.gameRoomsNumber = this.gameRooms?.length || 0;
    this.players = this.gameRooms?.map(room => room.players).flat() || [];

    this.loadingSpinner = false;
  }

  async exitGameRoom(roomName : string){
    this.loadingSpinner = true;
    try{
      await this.gameRoomService.exitGameRoom(roomName);
      this.successMessage = "Vous avez quitté la salle de jeu " + roomName + ".";

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.initGameRoomAttributes();
      }, this.alertDuration);

    }catch (e : any) {
      this.errorMessage = "Erreur lors de la sortie de la salle de jeu. Veuillez réessayer plus tard."

      //alert
      setTimeout(() => {
        this.errorMessage = null;
      }, this.alertDuration);

    }

    this.loadingSpinner = false;
  }

  async joinGameRoom(roomName : string){
    this.loadingSpinner = true;
    try{
      await this.gameRoomService.joinGameRoom(roomName);
      this.successMessage = "Vous avez rejoint la salle de jeu " + roomName + ".";

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.initGameRoomAttributes();
      }, this.alertDuration);

    }catch (e : any) {
      this.errorMessage = "Erreur lors de la sortie de la salle de jeu. Veuillez réessayer plus tard."

      //alert
      setTimeout(() => {
        this.errorMessage = null;
      }, this.alertDuration);

    }

    this.loadingSpinner = false;
  }

  public isOwnerIncludedInPlayers(room : IGameRoom) : boolean{
    let isOwnerIncluded = false;
    room.players.forEach(player => {
      if(player.pseudo == this.userService.getCurrentUserPseudo()){
        isOwnerIncluded = true;
      }
    })
    return isOwnerIncluded;
  }

}
