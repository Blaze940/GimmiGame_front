import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../_services/user.service";
import {Router} from "@angular/router";
import {GameRoomService} from "../../_services/game-room.service";
import {ICreateGameRoom} from "../../_interfaces/ICreateGameRoom";
import {IRequestUser} from "../../_interfaces/IRequestUser";

@Component({
  selector: 'app-game-room-create',
  templateUrl: './game-room-create.component.html',
  styleUrls: ['./game-room-create.component.css']
})
export class GameRoomCreateComponent implements OnInit {
  @Input() owner! : string | null ;

  gameRoomForm! : FormGroup;
  gameRoomFormSubmitted : ICreateGameRoom = {
    roomName : '',
    currentGame : '',
    creator : '',
    maxPlayers : 2
  }

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gameRoomService : GameRoomService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.initGameRoomForm()
  }

  async onSubmit() : Promise<void> {
    if (this.gameRoomForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loadingSpinner = true;
    this.gameRoomFormSubmitted = {
      ...this.gameRoomForm.value,
      creator : this.userService.getCurrentUserPseudo(),
    };
    console.log("Submitted" + JSON.stringify(this.gameRoomFormSubmitted))

    try {
      await this.gameRoomService.createGameRoom(this.gameRoomFormSubmitted);

      this.successMessage =
        "Salle de jeu créée avec succès !";
      this.gameRoomForm.reset();

    } catch (error: any) {
      this.errorMessage = "Erreur lors de la création de la salle de jeu. Veuillez réessayer plus tard.";
    }

    this.loadingSpinner = false;
    // setTimeout(() => {
    //   this.refreshPage();
    // }, this.alertDuration);
  }

  private initGameRoomForm() {
    this.gameRoomForm = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      currentGame: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      maxPlayers: [2, [Validators.required, Validators.min(2), Validators.max(20)]],
    })

  }

  private refreshPage() {
    location.reload();
  }
}
