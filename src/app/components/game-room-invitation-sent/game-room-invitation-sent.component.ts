import {Component, Input, OnInit} from '@angular/core';
import {IGameRoomInvitation} from "../../_interfaces/IGameRoomInvitation";
import {Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {GameRoomInvitationService} from "../../_services/game-room-invitation.service";

@Component({
  selector: 'app-game-room-invitation-sent',
  templateUrl: './game-room-invitation-sent.component.html',
  styleUrls: ['./game-room-invitation-sent.component.css']
})
export class GameRoomInvitationSentComponent implements OnInit {

  @Input() owner! : string | null ;

  gameRoomInvitationsSent : IGameRoomInvitation[] | undefined = undefined;

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;

  constructor(
    private router: Router,
    private userService : UserService,
    private gameRoomInvitationService : GameRoomInvitationService

  ) { }

  ngOnInit(): void {
    this.initGameRoomInvitationSent()
  }

  async cancelInvitation(_id: string) {
    ///call api , notify, refresh
    try{
      await this.gameRoomInvitationService.refuseGameRoomInvitation(_id)

      this.successMessage = "Invitation annulée"

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }catch (e : any) {

      this.errorMessage = "Erreur lors de l'annulation de l'invitation. Veuillez réessayer plus tard."
        "Details => " + e.toString()

      //alert
      setTimeout(() => {
        this.errorMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }
  }

  private async initGameRoomInvitationSent() {
    this.loadingSpinner = true;
    try{
      this.gameRoomInvitationsSent = await this.gameRoomInvitationService.getAllPendingSentBy(this.userService.getCurrentUserId());
      this.loadingSpinner = false;
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération des invitations envoyées. Veuillez réessayer plus tard.\n" +
        "Details => " + e.toString()
      this.loadingSpinner = false;
    }
  }
  private refreshPage() {
    location.reload();
  }

}
