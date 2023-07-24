import {Component, Input, OnInit} from '@angular/core';
import {IGameRoom} from "../../_interfaces/IGameRoom";
import {GameRoomService} from "../../_services/game-room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-room-list',
  templateUrl: './game-room-list.component.html',
  styleUrls: ['./game-room-list.component.css']
})
export class GameRoomListComponent implements OnInit {

  @Input() owner! : string | null ;

  gameRooms : IGameRoom[] | undefined = undefined;
  gameRoomsNumber : number = 0;

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;

  constructor(
    private router: Router,
    private gameRoomService : GameRoomService,

  ) { }

  ngOnInit(): void {
    this.initGameRoomAttributes()
  }

  private async initGameRoomAttributes() {
    this.loadingSpinner = true;
    try{
      this.gameRooms = await this.gameRoomService.getMyRooms()
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération des salles de jeu. Veuillez réessayer plus tard."
    }

    this.gameRoomsNumber = this.gameRooms?.length || 0;

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
      if(player.pseudo == this.owner){
        isOwnerIncluded = true;
      }
    })
    return isOwnerIncluded;
  }

  public enterGameroom(roomId :string): void{
    this.router.navigate(['/gameroom', roomId]);
  }

}
