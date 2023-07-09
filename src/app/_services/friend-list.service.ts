import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {FriendRequestAPIService} from "./callAPI/friend-requestAPI.service";
import {FriendListAPIService} from "./callAPI/friend-listAPI.service";
import {IFriendList} from "../_interfaces/IFriendList";

@Injectable({
  providedIn: 'root'
})
export class FriendListService {

  constructor(private router : Router, private http: HttpClient, private userService : UserService, private friendListAPIService : FriendListAPIService) { }

  async getAll() : Promise<IFriendList[] | undefined>{
    try{
      const response = await this.friendListAPIService.getAll().toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getOneByPseudo(pseudo: string | null) : Promise<IFriendList | undefined>{
    try{
      const response = await this.friendListAPIService.getOneByPseudo(pseudo).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async suppressFriendShip(friendPseudo: string) : Promise<void>{
    let senderPseudo: string | null;

    try {
      senderPseudo = this.userService.getCurrentUserPseudo();
    } catch (e) {
      return Promise.reject(e);
    }

    try{
      const response = await this.friendListAPIService.suppressFriendShip(senderPseudo, friendPseudo).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
