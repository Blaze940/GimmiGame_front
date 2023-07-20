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
  currentUser! : IRequestUser | null;
  gameRoomForm! : FormGroup;
  gameRoomFormSubmitted! : ICreateGameRoom

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
    this.initCurrentUser()
    this.initGameRoomForm()
  }

  async onSubmit() : Promise<void> {
    if (this.gameRoomForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loadingSpinner = true;
    this.gameRoomFormSubmitted = this.gameRoomForm.value;

    try {
      await this.gameRoomService.createGameRoom(this.gameRoomFormSubmitted);

      this.successMessage =
        "Salle de jeu créée avec succès !";
      this.gameRoomForm.reset();

      //Timeout to let the user read the success message
      setTimeout(() => {
        this.router.navigate(['/']).then(() => {
          window.location.href = '/?refresh=true';
        });
      }, 3000);

    } catch (error: any) {
      this.errorMessage = "Erreur lors de la création de la salle de jeu. Veuillez réessayer plus tard.";
    }

    this.loadingSpinner = false;
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, this.alertDuration);
  }

  private initGameRoomForm() {
    this.gameRoomForm = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      currentGame: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      maxPlayers: [2, [Validators.required, Validators.min(2), Validators.max(20)]],
    })

    this.gameRoomFormSubmitted ={
      roomName : '',
      currentGame : '',
      creator : this.currentUser?.pseudo.toString() || '',
      maxPlayers : 2
    }
  }

  private async initCurrentUser() {
    this.loadingSpinner = true;
    try{
      this.currentUser = await this.userService.getUserByPseudo(this.owner)
    }catch(e : any){
      this.errorMessage = "Erreur lors de la récupération de l'utilisateur. Veuillez réessayer plus tard."
    }
    this.loadingSpinner = false;
  }
  private refreshPage() {
    location.reload();
  }
}
