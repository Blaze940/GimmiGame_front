import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IGameRoom} from "../../_interfaces/IGameRoom";
import {Observable} from "rxjs";
import {ICreateGameRoom} from "../../_interfaces/ICreateGameRoom";
import {IGameRoomInvitation} from "../../_interfaces/IGameRoomInvitation";

@Injectable({
  providedIn: 'root'
})
export class GameRoomAPIService {

  base_URL: string = environment.API_URL + 'game-rooms/'
  constructor(private router: Router, private http: HttpClient) { }

  getAll() : Observable<IGameRoom[]>{
    return this.http.get<IGameRoom[]>(this.base_URL + 'all')
  }

  getOneById(_id: string | null) : Observable<IGameRoom> {
    return this.http.get<IGameRoom>(this.base_URL + 'id/' + _id);
  }

  createGameRoom(createGameRoomForm: ICreateGameRoom) : Observable<void> {
    return this.http.post<void>(this.base_URL + 'create', createGameRoomForm);
  }

  joinGameRoom(roomName: string | null , userId: string | null) : Observable<void> {
    return this.http.patch<void>(this.base_URL + 'join' +'?roomName=' + roomName + '&userId=' + userId, null);
  }

  exitGameRoom(roomName: string | null , userId: string | null) : Observable<void> {
    return this.http.patch<void>(this.base_URL + 'exit' +'?roomName=' + roomName + '&userId=' + userId, null);
  }

  updateGameRoom(roomName : string| null, gameRoomBody : IGameRoom) : Observable<void> {
    return this.http.patch<void>(this.base_URL + 'update/' + roomName, gameRoomBody);
  }

  deleteGameRoom(roomName : string| null) : Observable<void> {
    return this.http.delete<void>(this.base_URL + 'delete/' + roomName);
  }

}
