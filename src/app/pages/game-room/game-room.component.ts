import {Component, OnInit} from '@angular/core';
import {IGameRoom} from "../../_interfaces/IGameRoom";
import {ActivatedRoute, Router} from "@angular/router";
import {GameRoomService} from "../../_services/game-room.service";
import {UserService} from "../../_services/user.service";
import {ThemeService} from "../../_services/theme.service";
import {BehaviorSubject} from "rxjs";
import {IMsgTchat} from "../../_interfaces/IMsgTchat";
import {WebSocketService} from "../../_services/web-socket.service";

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {

  gameRoom: IGameRoom | undefined = undefined;
  players: { _id: string, pseudo: string }[] = [];
  playersNumber: number = 0;
  myChatMessage: string = "";
  chatMessagesByGameRoom: { [gameRoomId: string]: IMsgTchat[] } = {};
  currentUserPseudo = this.userService.getCurrentUserPseudo()
  currentGameRoomId: string = "";
  currentRoomName: string = "";
  creatorRoom: string = "";
  maxPlayers: number = 0;

  currentTheme: BehaviorSubject<string> = new BehaviorSubject<string>("dark")

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameRoomService: GameRoomService,
    private userService: UserService,
    private themeService: ThemeService,
    private webSocketService: WebSocketService
  ) {
    // Ne faites pas cela dans le constructeur, car gameRoom n'est pas encore défini ici.
    // Vous initialiserez chatMessagesByGameRoom dans la méthode ngOnInit()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentGameRoomId = params['roomId'];
    });
    this.initGameRoomAttributes();
    this.subscribeToMessages()
    this.themeService.getTheme().subscribe(theme => {
      this.currentTheme.next(theme);
    });
  }

  sendMessage() {
    if (this.myChatMessage && this.currentGameRoomId) { // Vérifie si currentGameRoomId est défini
      const chatMessage: IMsgTchat = {
        from: this.currentUserPseudo!,
        msg: this.myChatMessage
      };
      this.chatMessagesByGameRoom[this.currentGameRoomId].push(chatMessage); // Utilise currentGameRoomId pour ajouter le message de chat à la gameroom spécifique
      this.webSocketService.sendMessage(chatMessage);
      this.myChatMessage = '';
    }
  }
  subscribeToMessages() {
    this.webSocketService.getMessages();
    this.webSocketService.receivedMessages$.subscribe((data: IMsgTchat[]) => {
      const currentRoomMessages = this.chatMessagesByGameRoom[this.currentGameRoomId];
      if (currentRoomMessages) {
        // Ajoute uniquement les nouveaux messages reçus à la liste des messages locaux
        const newMessages = data.filter((message) => !currentRoomMessages.some((msg) => msg.from === message.from && msg.msg === message.msg));
        currentRoomMessages.push(...newMessages);
      }
    });
  }




  private async initGameRoomAttributes() {
    this.loadingSpinner = true;
    try {
      this.gameRoom = await this.gameRoomService.getOne(this.currentGameRoomId);

      if(this.gameRoom){
        this.setRoomAttributes(this.gameRoom)
      }
      this.loadingSpinner = false;
      this.successMessage = "Les salles de jeu ont été chargées avec succès.";

      //alert
      setTimeout(() => {
        this.successMessage = null;
      }, this.alertDuration);

      // Initialise chatMessagesByGameRoom ici après avoir obtenu gameRoom avec succès
      this.chatMessagesByGameRoom[this.currentGameRoomId] = []; // Initialisez le tableau de messages de chat pour cette gameroom
    } catch (e: any) {
      this.loadingSpinner = false;
      this.errorMessage = "Erreur lors du chargement des salles de jeu. Veuillez réessayer plus tard."

      //alert
      setTimeout(() => {
        this.errorMessage = null;
      }, this.alertDuration);

    }
  }

  async exitGameRoom(roomName : string){
    this.loadingSpinner = true;
    try{
      await this.gameRoomService.exitGameRoom(roomName);
      this.successMessage = "Vous avez quitté la salle de jeu " + roomName + ".";

      //alert
      setTimeout(() => {
        this.successMessage = null;
        this.initGameRoomAttributes();
      }, this.alertDuration);

    }catch (e : any) {
      this.errorMessage = "Erreur lors de la sortie de la salle de jeu. Veuillez réessayer plus tard."

      //alert
      setTimeout(() => {
        this.errorMessage = null;
      }, this.alertDuration);

    }

    this.loadingSpinner = false;
  }

  public isOwnerIncludedInPlayers(room : IGameRoom) : boolean{
    let isOwnerIncluded = false;
    room.players.forEach(player => {
      if(player.pseudo == this.userService.getCurrentUserPseudo()){
        isOwnerIncluded = true;
      }
    })
    return isOwnerIncluded;
  }

  setRoomAttributes(room : IGameRoom) : void {
    this.currentRoomName = room.roomName;
    this.maxPlayers = room.maxPlayers;
    this.playersNumber = room.players.length;
    this.players = room.players;
    this.creatorRoom = room.creator.pseudo;


  }

}
