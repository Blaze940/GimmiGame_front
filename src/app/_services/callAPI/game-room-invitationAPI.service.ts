import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IGameRoomInvitation} from "../../_interfaces/IGameRoomInvitation";
import {Observable} from "rxjs";
import {ICreateGameRoomInvitation} from "../../_interfaces/ICreateGameRoomInvitation";

@Injectable({
  providedIn: 'root'
})
export class GameRoomInvitationAPIService {

  base_URL: string = environment.API_URL + 'game-room-invitations/'
  constructor(private router: Router, private http: HttpClient) { }

  getAll() : Observable<IGameRoomInvitation[]>{
    return this.http.get<IGameRoomInvitation[]>(this.base_URL + 'all')
  }

  getOneById(_id: string | null) : Observable<IGameRoomInvitation> {
    return this.http.get<IGameRoomInvitation>(this.base_URL + 'id/' + _id);
  }

  createGameRoomInvitation(gameRoomInvitationBody: ICreateGameRoomInvitation) : Observable<void> {
    return this.http.post<void>(this.base_URL + 'create', gameRoomInvitationBody);
  }

  acceptGameRoomInvitation(gameRoomInvitationId: string | null) : Observable<void> {
    return this.http.patch<void>(this.base_URL + 'accept/' + gameRoomInvitationId, null);
  }

  refuseGameRoomInvitation(gameRoomInvitationId: string | null) : Observable<void> {
    return this.http.patch<void>(this.base_URL + 'refuse/' + gameRoomInvitationId, null);
  }

  deleteGameRoomInvitation(gameRoomInvitationId: string | null) : Observable<void> {
    return this.http.delete<void>(this.base_URL + 'delete/' + gameRoomInvitationId);
  }

}
