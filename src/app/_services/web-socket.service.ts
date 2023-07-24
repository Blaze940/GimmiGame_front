import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMsgTchat} from "../_interfaces/IMsgTchat";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private receivedMessagesSubject: BehaviorSubject<IMsgTchat[]> = new BehaviorSubject<IMsgTchat[]>([]);
  public receivedMessages$: Observable<IMsgTchat[]> = this.receivedMessagesSubject.asObservable();

  constructor(private socket: Socket) {
  }

  sendMessage(message: IMsgTchat): void {
    this.socket.emit('sendMessage', message);
  }


  getMessages(): void {
    this.socket.on('receivedMessage', (data: IMsgTchat) => {
      console.log("Message received : ", data);
      this.receivedMessagesSubject.next([...this.receivedMessagesSubject.getValue(), data]);
    });
  }


}
