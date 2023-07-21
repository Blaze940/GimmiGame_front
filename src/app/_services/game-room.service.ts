import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {GameRoomAPIService} from "./callAPI/game-roomAPI.service";
import {IGameRoom} from "../_interfaces/IGameRoom";
import {ICreateGameRoom} from "../_interfaces/ICreateGameRoom";
import {IUser} from "../_interfaces/IUser";
import {IRequestUser} from "../_interfaces/IRequestUser";

@Injectable({
  providedIn: 'root'
})
export class GameRoomService {

  constructor(private router : Router,
              private http: HttpClient,
              private userService : UserService,
              private gameRoomAPIService : GameRoomAPIService) { }


  async getMyRooms() : Promise<IGameRoom[] | undefined> {
    //Get the current user
    let currentUserPseudo : string | null;
    let currentUser : IRequestUser | null ;
    try{
      currentUserPseudo = this.userService.getCurrentUserPseudo();
      currentUser = await this.userService.getUserByPseudo(currentUserPseudo);
    } catch (e) {
      return Promise.reject(e);
    }

    if(currentUserPseudo === null){
      return Promise.reject("User not connected");
    }

    if(currentUser === null){
      return Promise.reject("User not found");
    }

    const myRooms = await this.getRoomsOfUser(currentUser._id)

    return Promise.resolve(myRooms);
  }
  async getAll() : Promise<IGameRoom[] | undefined> {
    try{
      const response = await this.gameRoomAPIService.getAll().toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getOne(_id: string) : Promise<IGameRoom | undefined> {
    try{
      const response = await this.gameRoomAPIService.getOneById(_id).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async createGameRoom(gameRoom: ICreateGameRoom) : Promise<void | undefined> {
    try{
      const response = await this.gameRoomAPIService.createGameRoom(gameRoom).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async joinGameRoom(roomName: string) : Promise<void | undefined> {
    let currentUserId : string | null = this.userService.getCurrentUserId();

    if(currentUserId === null){
      return Promise.reject("User not connected");
    }

    try{
      const response = await this.gameRoomAPIService.joinGameRoom(roomName, currentUserId).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async exitGameRoom(roomName: string) : Promise<void | undefined> {
    let currentUserId : string | null = this.userService.getCurrentUserId();

    if(currentUserId === null){
      return Promise.reject("User not connected");
    }

    try{
      const response = await this.gameRoomAPIService.exitGameRoom(roomName, currentUserId).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateGameRoom(roomName: string, gameRoomForm: IGameRoom) : Promise<void | undefined> {
    try{
      const response = await this.gameRoomAPIService.updateGameRoom(roomName, gameRoomForm).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async deleteGameRoom(roomName: string) : Promise<void | undefined> {
    try{
      const response = await this.gameRoomAPIService.deleteGameRoom(roomName).toPromise();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getRoomsOfUser(userId: string) : Promise<IGameRoom[] | undefined> {

    //Get all the rooms
    let allRooms : IGameRoom[] | undefined
    try{
      allRooms = await this.getAll();
    }catch (e) {
      return Promise.reject(e);
    }

    if(allRooms === undefined){
      return Promise.resolve([]);
    }

    //Get the rooms where the user is. As a player or creator
    let myRooms : IGameRoom[] = [];
    for(let room of allRooms){
      if(room.creator._id === userId){
        myRooms.push(room);
      }else{
        for(let player of room.players){
          if(player._id === userId){
            myRooms.push(room);
          }
        }
      }
    }

    return Promise.resolve(myRooms);
  }
}
