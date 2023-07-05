import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {FriendRequestAPIService} from "./callAPI/friend-requestAPI.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  constructor(private router : Router, private http: HttpClient, private userService : UserService, private friendRequestAPIService : FriendRequestAPIService  ) { }

  async createFriendRequest(receiverPseudo: string) :Promise<Object | undefined> {
    let senderPseudo: string | null;

    try {
      senderPseudo = this.userService.getCurrentUserPseudo();
    } catch (e) {
      return Promise.reject(e);
    }

    try {
      const response = await this.friendRequestAPIService.createFriendRequest(senderPseudo, receiverPseudo).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }

  }

}
