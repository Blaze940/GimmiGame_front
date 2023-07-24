import {Component, OnInit} from '@angular/core';
import {IGameRoom} from "../../_interfaces/IGameRoom";
import {ActivatedRoute, Router} from "@angular/router";
import {GameRoomService} from "../../_services/game-room.service";
import {UserService} from "../../_services/user.service";
import {ThemeService} from "../../_services/theme.service";
import {BehaviorSubject} from "rxjs";
import {IMsgTchat} from "../../_interfaces/IMsgTchat";
import {WebSocketService} from "../../_services/web-socket.service";
import {IPadMorpion} from "../../_interfaces/IPadMorpion";
import {MorpionKey} from "../../_enums/MorpionKey";

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {
  currentTheme: BehaviorSubject<string> = new BehaviorSubject<string>("dark")

  //Game Session
  // canBeLaunched : boolean = false;
  // isStarted : boolean = false;

  //Pour tests
  canBeLaunched : boolean = true;
  isStarted : boolean = true;


///
  gameRoom: IGameRoom | undefined = undefined;
  players: { _id: string, pseudo: string }[] = [];
  playersNumber: number = 0;
  myChatMessage: string = "";
  chatMessagesByGameRoom: { [gameRoomId: string]: IMsgTchat[] } = {};
  currentUserPseudo = this.userService.getCurrentUserPseudo()
  currentGameRoomId: string = "";
  currentRoomName: string = "";
  creatorRoom: string = "";
  currentGameName : string = "" ;
  maxPlayers: number = 0;
///


  //Morpion
  selectedCase: MorpionKey | null = null;

  padMorpion : IPadMorpion = {
    touches : new Map([
      [MorpionKey.TopLeft, false], // false pour indiquer que la case n'est pas marquée
      [MorpionKey.TopMid, false],
      [MorpionKey.TopRight, false],
      [MorpionKey.MidLeft, false],
      [MorpionKey.Center, false],
      [MorpionKey.MidRight, false],
      [MorpionKey.BottomLeft, false],
      [MorpionKey.BottomMid, false],
      [MorpionKey.BottomRight, false],
    ])
  }
  morpionKeys: MorpionKey[] = Object.values(MorpionKey);

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
  ) { }

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

  //Morpion Functions
  jouerCetteCase() {
    if (this.selectedCase) {
      // Ici, vous pouvez utiliser this.selectedCase pour accéder à la clé de la case sélectionnée.
      console.log('Case sélectionnée:', this.selectedCase);
      //console.log('Valeur de la case sélectionnée: ', this.padMorpion.touches.get(this.selectedCase));

      // Vous pouvez également mettre à jour la valeur de la case sélectionnée dans l'objet padMorpion si nécessaire.
      this.padMorpion.touches.set(this.selectedCase, true);
      console.log('Valeur apres selection: ', this.padMorpion.touches.get(this.selectedCase));

      // Réinitialiser la sélection après avoir joué la case
      this.selectedCase = null;
    }
  }

  selectCase(key: MorpionKey) {
    this.selectedCase = key;
  }
  getDisabledState(key: MorpionKey): boolean | undefined {
    return this.padMorpion.touches.get(key);
  }

  get sortedMorpionKeys(): MorpionKey[] {
    return [
      MorpionKey.TopLeft,
      MorpionKey.TopMid,
      MorpionKey.TopRight,
      MorpionKey.MidLeft,
      MorpionKey.Center,
      MorpionKey.MidRight,
      MorpionKey.BottomLeft,
      MorpionKey.BottomMid,
      MorpionKey.BottomRight,
    ];
  }

  //GameSession functions
  public startGameSession(){
    this.isStarted = true;
  }
  public stopGameSession(){
    this.isStarted = false;
  }



  //GameRoom Functions

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
    this.currentGameName = room.currentGame;
  }

  private resetPadMorpion() {
    this.padMorpion.touches.forEach((value, key) => {
      this.padMorpion.touches.set(key, false);
    });
    this.morpionKeys = Object.values(MorpionKey);
    this.selectedCase = null;
  }

}
