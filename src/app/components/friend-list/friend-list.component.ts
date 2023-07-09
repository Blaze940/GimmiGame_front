import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../_interfaces/IUser";
import {Router} from "@angular/router";
import {FriendListService} from "../../_services/friend-list.service";
import {IFriendList} from "../../_interfaces/IFriendList";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  //Non nullable to avoid error and obligate to pass data
  @Input() owner! : string | null ;
  friendList : IFriendList | undefined = undefined;
  friends : IUser[] | undefined = undefined;
  friendsNumber : number = 0;

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;


  constructor(
    private router: Router,
    private friendListService : FriendListService
  ) { }

  ngOnInit(): void {
    this.initFriendListAttributes()
  }

  async removeFriend(friendPseudo: string) {
    //call api , notify, refresh
    try{
      await this.friendListService.suppressFriendShip(friendPseudo);

      this.successMessage = "Vous avez supprimé cet utilisateur de votre liste d'amis"

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);
    }catch (e : any) {

        this.errorMessage = "Erreur lors de la suppression de l'ami. Veuillez réessayer plus tard.\n" +
          "Details => " + e.toString()

        //alert
        setTimeout(() => {
          this.errorMessage = null;
          this.refreshPage();
        }, this.alertDuration);
    }
  }

  private async initFriendListAttributes() {
    this.loadingSpinner = true;
    try{
      this.friendList = await this.friendListService.getOneByPseudo(this.owner);
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération de la liste d'amis. Veuillez réessayer plus tard.\n"
    }

    if(this.friendList != undefined){
      this.friends = this.friendList.friends;
      this.friendsNumber = this.friends.length;
    }

    this.loadingSpinner = false;
  }

  private refreshPage() {
    location.reload();
  }

}
