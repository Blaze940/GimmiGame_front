import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IFriendList} from "../../_interfaces/IFriendList";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendListAPIService {

  base_URL: string = environment.API_URL + 'friend-lists/'
  constructor(private router: Router, private http: HttpClient) { }

  getAll() : Observable<IFriendList[]>{
    return this.http.get<IFriendList[]>(this.base_URL + 'all')
  }

  getOneByPseudo(pseudo: string | null) : Observable<IFriendList> {
    return this.http.get<IFriendList>(this.base_URL + pseudo);
  }

  suppressFriendShip(pseudo: string | null, friendPseudo: string) :Observable<void>{
    return this.http.delete<void>(this.base_URL + 'suppress-friendship/' + pseudo + '/' + friendPseudo);
  }

}
