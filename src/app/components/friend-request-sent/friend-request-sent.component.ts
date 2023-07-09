import {Component, Input, OnInit} from '@angular/core';
import {IFriendRequest} from "../../_interfaces/IFriendRequest";
import {Router} from "@angular/router";
import {FriendRequestService} from "../../_services/friend-request.service";

@Component({
  selector: 'app-friend-request-sent',
  templateUrl: './friend-request-sent.component.html',
  styleUrls: ['./friend-request-sent.component.css']
})
export class FriendRequestSentComponent implements OnInit {

  //Non nullable to avoid error and obligate to pass data
  @Input() owner! : string | null ;

  friendRequestsSent : IFriendRequest[] | undefined = undefined;

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
    this.initFriendRequestSent()
  }

  async cancelInvitation(_id: string) {
    ///call api , notify, refresh
    try{
      await this.friendRequestService.deleteFriendRequest(_id)

      this.successMessage = "Demande d'ami annulée"

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }catch (e : any) {

      this.errorMessage = "Erreur lors de l'annulation de la demande. Veuillez réessayer plus tard.\n" +
        "Details => " + e.toString()

      //alert
      setTimeout(() => {
        this.errorMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }
  }

  private async initFriendRequestSent() {
    this.loadingSpinner = true;
    try{
      this.friendRequestsSent = await this.friendRequestService.getAllPendingFrom(this.owner)
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération des demandes d'amis envoyées. Veuillez réessayer plus tard.\n" +
        "Details => " + e.toString()
    }
    this.loadingSpinner = false;
  }

  private refreshPage() {
    location.reload();
  }


}
