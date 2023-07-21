import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GameRoomInvitationAPIService} from "./callAPI/game-room-invitationAPI.service";
import {UserService} from "./user.service";
import {IGameRoomInvitation} from "../_interfaces/IGameRoomInvitation";
import {ICreateGameRoomInvitation} from "../_interfaces/ICreateGameRoomInvitation";
import RequestStatusEnum from "../_enums/request-status-enum";

@Injectable({
  providedIn: 'root'
})
export class GameRoomInvitationService {


  constructor(private router: Router,
              private http: HttpClient,
              private userService : UserService,
              private gameRoomInvitationAPIService : GameRoomInvitationAPIService) { }

  async getAll() : Promise<IGameRoomInvitation[] | undefined> {
    try{
      const response = await this.gameRoomInvitationAPIService.getAll().toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  getAllSentToUser() : Promise<IGameRoomInvitation[] | undefined> {
    //Get the current user
    let currentUserPseudo : string | null;
    let currentUser : any | null ;
    try{
      currentUserPseudo = this.userService.getCurrentUserPseudo();
      currentUser = this.userService.getUserByPseudo(currentUserPseudo);
    } catch (e) {
      return Promise.reject(e);
    }

    if(currentUserPseudo === null){
      return Promise.reject("User not connected");
    }

    if(currentUser === null){
      return Promise.reject("User not found");
    }

    return Promise.resolve(this.getAllPendingSentTo(currentUser._id)) ;
  }

  getAllSentByUser() : Promise<IGameRoomInvitation[] | undefined> {
    //Get the current user
    let currentUserPseudo : string | null;
    let currentUser : any | null ;
    try{
      currentUserPseudo = this.userService.getCurrentUserPseudo();
      currentUser = this.userService.getUserByPseudo(currentUserPseudo);
    } catch (e) {
      return Promise.reject(e);
    }

    if(currentUserPseudo === null){
      return Promise.reject("User not connected");
    }

    if(currentUser === null){
      return Promise.reject("User not found");
    }

    return Promise.resolve(this.getAllPendingSentBy(currentUser._id)) ;
  }

  async getOneById(_id: string) : Promise<IGameRoomInvitation | undefined> {
    try{
      const response = await this.gameRoomInvitationAPIService.getOneById(_id).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async sendGameRoomInvitation(gameRoomInvitationBody: ICreateGameRoomInvitation) : Promise<void> {
    try{
      const response = await this.gameRoomInvitationAPIService.createGameRoomInvitation(gameRoomInvitationBody).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async acceptGameRoomInvitation(_id: string) : Promise<void> {
    try{
      const response = await this.gameRoomInvitationAPIService.acceptGameRoomInvitation(_id).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async refuseGameRoomInvitation(_id: string) : Promise<void> {
    try{
      const response = await this.gameRoomInvitationAPIService.refuseGameRoomInvitation(_id).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async deleteGameRoomInvitation(_id: string) : Promise<void> {
    try{
      const response = await this.gameRoomInvitationAPIService.deleteGameRoomInvitation(_id).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAllPendingSentTo(userId: string | null): Promise<IGameRoomInvitation[] | undefined> {
    let allRoomsInvitation: IGameRoomInvitation[] | undefined = []
    try {
      allRoomsInvitation = await this.getAll();
    } catch (e) {
      return Promise.reject(e);
    }

    if (allRoomsInvitation === undefined) {
      return Promise.reject("No game room invitation found");
    }

    let allSentTo: IGameRoomInvitation[] = [];
    allRoomsInvitation.forEach((gameRoomInvitation) => {
      if (gameRoomInvitation.to._id === userId && gameRoomInvitation.status === RequestStatusEnum.PENDING) {
        allSentTo.push(gameRoomInvitation);
      }
    });

    return Promise.resolve(allSentTo);
  }

  async getAllPendingSentBy(userId: string | null): Promise<IGameRoomInvitation[] | undefined> {
    let allRoomsInvitation: IGameRoomInvitation[] | undefined = []
    try {
      allRoomsInvitation = await this.getAll();
    } catch (e) {
      return Promise.reject(e);
    }

    if (allRoomsInvitation === undefined) {
      return Promise.reject("No game room invitation found");
    }

    let allSentBy: IGameRoomInvitation[] = [];
    allRoomsInvitation.forEach((gameRoomInvitation) => {
      if (gameRoomInvitation.from._id === userId && gameRoomInvitation.status === "PENDING") {
        allSentBy.push(gameRoomInvitation);
      }
    });

    return Promise.resolve(allSentBy);
  }
}
