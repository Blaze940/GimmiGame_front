import {Component, Input, OnInit} from '@angular/core';
import {IGameRoomInvitation} from "../../_interfaces/IGameRoomInvitation";
import {Router} from "@angular/router";
import {GameRoomInvitationService} from "../../_services/game-room-invitation.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-game-room-invitation-received',
  templateUrl: './game-room-invitation-received.component.html',
  styleUrls: ['./game-room-invitation-received.component.css']
})
export class GameRoomInvitationReceivedComponent implements OnInit {

  @Input() owner! : string | null ;

  gameRoomInvitationsReceived : IGameRoomInvitation[] | undefined = undefined;

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;

  constructor(
    private router: Router,
    private gameRoomInvitationService : GameRoomInvitationService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.initGameRoomInvitationReceived();
  }

  async acceptInvitation(_id: string) {
    //call api , notify, refresh
    try{
      await this.gameRoomInvitationService.acceptGameRoomInvitation(_id);

      this.successMessage = "Vous avez rejoint la room"

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }catch (e : any) {

      this.errorMessage = "Erreur lors de l'acceptation de la demande. Veuillez réessayer plus tard.\n" +
        "Details => " + e.toString()

      //alert
      setTimeout(() => {
        this.errorMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }
  }

  async rejectInvitation(_id: string) {
    //call api , notify, refresh
    try{
      await this.gameRoomInvitationService.refuseGameRoomInvitation(_id)

      this.successMessage = "Vous avez refusé la room"

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }catch (e : any) {

      this.errorMessage = "Erreur lors du refus de la demande. Veuillez réessayer plus tard.\n" +
        "Details => " + e.toString()

      //alert
      setTimeout(() => {
        this.errorMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }
  }

  private async initGameRoomInvitationReceived() {
    this.loadingSpinner = true;
    try{
      this.gameRoomInvitationsReceived = await this.gameRoomInvitationService.getAllPendingSentTo(this.userService.getCurrentUserId())
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération des invitations recues. Veuillez réessayer plus tard."
    }
    this.loadingSpinner = false;
  }

  private refreshPage() {
    location.reload();
  }


}
