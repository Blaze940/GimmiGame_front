import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFriendRequest} from "../../_interfaces/IFriendRequest";

@Injectable({
  providedIn: 'root'
})
export class FriendRequestAPIService {
  base_URL: string = environment.API_URL + 'friend-requests/'
  constructor(private router: Router, private http: HttpClient) { }

  createFriendRequest(senderPseudo: string | null, receiverPseudo: string) : Observable<any> {
    return this.http.post(this.base_URL + 'create', {"from" : senderPseudo, "to" : receiverPseudo});
  }

  getAll() : Observable<IFriendRequest[]> {
    return this.http.get<IFriendRequest[]>(this.base_URL + 'all')
  }

  getAllFrom(pseudo: string) : Observable<IFriendRequest[]> {
    return this.http.get<IFriendRequest[]>(this.base_URL + 'from/' + pseudo)
  }

  getAllTo(pseudo: string | null) : Observable<IFriendRequest[]> {
    return this.http.get<IFriendRequest[]>(this.base_URL + 'to/' + pseudo)
  }

  acceptFriendRequest(_id: string) : Observable<void> {
    return this.http.patch<void>(this.base_URL + 'accept/' + _id, {})
  }

  refuseFriendRequest(_id: string) : Observable<void> {
    return this.http.patch<void>(this.base_URL + 'refuse/' + _id, {})
  }

  deleteFriendRequest(_id: string) : Observable<string> {
    return this.http.delete<string>(this.base_URL + 'delete/' + _id)
  }

}
