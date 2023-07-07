import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FriendRequestAPIService} from "./callAPI/friend-requestAPI.service";
import {UserService} from "./user.service";
import {IFriendRequest} from "../_interfaces/IFriendRequest";
import RequestStatusEnum from "../_enums/request-status-enum";

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

  async getAll() : Promise<IFriendRequest[] | undefined> {
    try{
      const response : IFriendRequest[] | undefined = await this.friendRequestAPIService.getAll().toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAllFrom(pseudo: string) : Promise<IFriendRequest[] | undefined> {
    try{
      const response : IFriendRequest[] | undefined = await this.friendRequestAPIService.getAllFrom(pseudo).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAllTo(pseudo: string | null) : Promise<IFriendRequest[] | undefined> {
    try{
      const response : IFriendRequest[] | undefined = await this.friendRequestAPIService.getAllTo(pseudo).toPromise();

      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // async acceptFriendRequest(_id: string) : Promise<string | undefined> {
  //   try{
  //     const response : string | undefined = await this.friendRequestAPIService.acceptFriendRequest(_id).toPromise();
  //     return Promise.resolve(response);
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // }
  //
  // async refuseFriendRequest(_id: string) : Promise<string | undefined> {
  //   try{
  //     const response : string | undefined = await this.friendRequestAPIService.refuseFriendRequest(_id).toPromise();
  //     return Promise.resolve(response);
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // }

  async acceptFriendRequest(_id: string): Promise<void> {
    try {
      console.log("Accepting friend request with ID:", _id);
      const response = await this.friendRequestAPIService.acceptFriendRequest(_id).toPromise();
      console.log("Friend request accepted:", response);
      return Promise.resolve(response);
    } catch (e) {
      console.error("Error accepting friend request:", e);
      return Promise.reject(e);
    }
  }

  async refuseFriendRequest(_id: string): Promise<void> {
    try {
      console.log("Refusing friend request with ID:", _id);
      const response = await this.friendRequestAPIService.refuseFriendRequest(_id).toPromise();
      console.log("Friend request refused:", response);
      return Promise.resolve(response);
    } catch (e) {
      console.error("Error refusing friend request:", e);
      return Promise.reject(e);
    }
  }


  async deleteFriendRequest(_id: string) : Promise<string | undefined> {
    try{
      const response : string | undefined = await this.friendRequestAPIService.deleteFriendRequest(_id).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAllPendingTo(pseudo: string | null) : Promise<IFriendRequest[] | undefined> {
    try{
      const response : IFriendRequest[] | undefined = await this.getAllTo(pseudo);
      if(response === undefined) {
        return Promise.reject("Error while getting all pending friend requests to " + pseudo);
      }
      const pendingFriendRequests : IFriendRequest[] = response.filter((friendRequest : IFriendRequest) => friendRequest.status === RequestStatusEnum.PENDING);
      return Promise.resolve(pendingFriendRequests);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAllPendingFrom(pseudo: string) : Promise<IFriendRequest[] | undefined> {
    try{
      const response : IFriendRequest[] | undefined = await this.getAllFrom(pseudo);
      if(response === undefined) {
        return Promise.reject("Error while getting all pending friend requests from " + pseudo);
      }
      const pendingFriendRequests : IFriendRequest[] = response.filter((friendRequest : IFriendRequest) => friendRequest.status === RequestStatusEnum.PENDING);
      return Promise.resolve(pendingFriendRequests);
    } catch (e) {
      return Promise.reject(e);
    }
  }


}
