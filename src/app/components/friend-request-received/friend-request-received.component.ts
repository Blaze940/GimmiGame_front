import {Component, Input, OnInit} from '@angular/core';
import {IFriendRequest} from "../../_interfaces/IFriendRequest";
import {Router} from "@angular/router";
import {FriendRequestService} from "../../_services/friend-request.service";

@Component({
  selector: 'app-friend-request-received',
  templateUrl: './friend-request-received.component.html',
  styleUrls: ['./friend-request-received.component.css']
})
export class FriendRequestReceivedComponent implements OnInit {

  //Non nullable to avoid error and obligate to pass data
  @Input() owner! : string | null ;

  friendRequestsReceived : IFriendRequest[] | undefined = undefined;

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;

  constructor(
    private router: Router,
    private friendRequestService : FriendRequestService
  ) { }

  ngOnInit(): void {
    this.initFriendRequestReceived();
  }

  async acceptInvitation(_id: string) {
    //call api , notify, refresh
    try{
      await this.friendRequestService.acceptFriendRequest(_id);

      this.successMessage = "Vous êtes maintenant ami avec cet utilisateur"

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
      await this.friendRequestService.refuseFriendRequest(_id)

      this.successMessage = "Vous avez refusé cette demande d'ami";

      //alert and refresh
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }catch (e : any) {
      this.errorMessage = "Erreur lors du refus de la demande. Veuillez réessayer plus tard.\n" +
        "Details => " + e.toString();

      //alert and refresh
      setTimeout(() => {
        this.errorMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }
  }

  private async initFriendRequestReceived() {
    this.loadingSpinner = true;
    try{
      this.friendRequestsReceived = await this.friendRequestService.getAllPendingTo(this.owner)
    }catch (e : any){
      this.errorMessage = "Erreur lors de la récupération des demandes reçues. Veuillez réessayer plus tard.\n"
    }
    this.loadingSpinner = false;
  }

  private refreshPage() {
    location.reload();
  }

}
