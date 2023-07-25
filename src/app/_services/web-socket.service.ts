import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMsgTchat} from "../_interfaces/IMsgTchat";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private receivedMessagesSubject: BehaviorSubject<IMsgTchat[]> = new BehaviorSubject<IMsgTchat[]>([]);
  public gameConnectedUsersSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private gameStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private gameDataFromServerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public receivedMessages$: Observable<IMsgTchat[]> = this.receivedMessagesSubject.asObservable();
  public gameConnectedUsers$: Observable<string[]> = this.gameConnectedUsersSubject.asObservable();
  public gameStatus$: Observable<boolean> = this.gameStatusSubject.asObservable();
  public gameDataFromServer$: Observable<any> = this.gameDataFromServerSubject.asObservable();




  constructor(private socket: Socket) {
  }

  sendMessage(message: IMsgTchat): void {
    this.socket.emit('sendMessage', message);
  }

  connectGame(pseudo: string | null): void {
    this.socket.emit('connectGame', pseudo);
  }

  disconnectGame(pseudo: string| null ): void {
    this.socket.emit('disconnectGame', pseudo);
  }

  startGame(pseudo: string| null ): void {
    this.socket.emit('startGame', pseudo);
  }

  getMessages(): void {
    this.socket.on('receivedMessage', (data: IMsgTchat) => {
      console.log("Message received : ", data);
      this.receivedMessagesSubject.next([...this.receivedMessagesSubject.getValue(), data]);
    });
  }

  getGameConnectedUsers(): void {
    this.socket.on('gameConnectedUsers', (data: string[]) => {
      console.log("Game Connected users received : ", data);
      this.gameConnectedUsersSubject.next(data);
    });
  }

  getGameStarted(): void {
    this.socket.on('gameStarted', (data: boolean) => {
      console.log("Game Started : ", data);
      this.gameStatusSubject.next(data);
    })
  }

  getGameDataFromServer() : void {
    this.socket.on('gameDataToClient', (data: any) => {
      console.log("Game Data From Server : ", data);
      this.gameDataFromServerSubject.next(data);
    })
  }




}
