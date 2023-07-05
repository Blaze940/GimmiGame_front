import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendRequestAPIService {
  base_URL: string = environment.API_URL + 'friend-requests/'
  constructor(private router: Router, private http: HttpClient) { }


  createFriendRequest(senderPseudo: string | null, receiverPseudo: string) : Observable<any> {
    return this.http.post(this.base_URL + 'create', {"from" : senderPseudo, "to" : receiverPseudo});
  }
}
