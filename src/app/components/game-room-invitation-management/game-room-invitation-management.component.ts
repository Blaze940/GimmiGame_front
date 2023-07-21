import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {GameRoomInvitationService} from "../../_services/game-room-invitation.service";
import {GameRoomService} from "../../_services/game-room.service";
import {FriendListService} from "../../_services/friend-list.service";
import {IGameRoom} from "../../_interfaces/IGameRoom";
import {IFriendRequest} from "../../_interfaces/IFriendRequest";
import {IFriendList} from "../../_interfaces/IFriendList";
import {ICreateGameRoom} from "../../_interfaces/ICreateGameRoom";
import {ICreateGameRoomInvitation} from "../../_interfaces/ICreateGameRoomInvitation";

@Component({
  selector: 'app-game-room-invitation-management',
  templateUrl: './game-room-invitation-management.component.html',
  styleUrls: ['./game-room-invitation-management.component.css']
})
export class GameRoomInvitationManagementComponent implements OnInit {

  invitationForm!: FormGroup;
  myGameRooms!: IGameRoom[] | undefined;

  myFriends!: IFriendList | undefined;
  @Input() owner! : string | null  ;

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gameRoomService: GameRoomService,
    private friendListService: FriendListService,
    private gameRoomInvitationService: GameRoomInvitationService,
    private userService : UserService

  ) { }

  ngOnInit(): void {
    this.initOwner()
    this.initMyGameRooms();
    this.initMyFriends();
    this.initInvitationForm()
  }

  async sentInvitation() {
    if (this.invitationForm.invalid) {
      return;
    }
    const friendToInvite = this.invitationForm.value.friendToInvite;
    const roomName = this.invitationForm.value.roomName;
    const invitation : ICreateGameRoomInvitation = {
      roomName: roomName,
      to: friendToInvite,
      from: this.owner!
    }

    try {
      await this.gameRoomInvitationService.sendGameRoomInvitation(invitation)
      this.successMessage = "Invitation envoyée à " + friendToInvite;

      //Show it for 4 seconds and refresh the page
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);

      this.invitationForm.reset();
    } catch (e : any) {
      this.errorMessage = "Erreur lors de l'envoi de l'invitation. Veuillez réessayer plus tard."
    }
  }

  private async initMyGameRooms() {
    this.loadingSpinner = true;
    try{
      this.myGameRooms = await this.gameRoomService.getMyRooms()
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération des salles de jeu. Veuillez réessayer plus tard."
    }

    this.loadingSpinner = false;
  }
  private async initMyFriends() {
    this.loadingSpinner = true;
    try{
      this.myFriends = await this.friendListService.getOneByPseudo(this.owner)
    }catch (e : any) {
      this.errorMessage = "Erreur lors de la récupération des amis. Veuillez réessayer plus tard."
    }

    this.loadingSpinner = false;
  }

  private initInvitationForm() {
    this.invitationForm = this.formBuilder.group({
      friendToInvite: ['',[Validators.required]],
      roomName: ['',[Validators.required]]
    });
  }


  private refreshPage() {
    location.reload();
  }

  private initOwner() {
    this.owner = this.userService.getCurrentUserPseudo()
  }
}
