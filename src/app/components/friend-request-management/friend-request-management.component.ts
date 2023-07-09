import {Component, Input, OnInit} from '@angular/core';
import {IFriendRequest} from "../../_interfaces/IFriendRequest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../_services/user.service";
import {Router} from "@angular/router";
import {FriendRequestService} from "../../_services/friend-request.service";

@Component({
  selector: 'app-friend-request-management',
  templateUrl: './friend-request-management.component.html',
  styleUrls: ['./friend-request-management.component.css']
})
export class FriendRequestManagementComponent implements OnInit {
  searchForm!: FormGroup;
  arrayRequestsSent : IFriendRequest [] | undefined = undefined;

  @Input() owner! : string | null  ;

  //Tools
  loadingSpinner = false;
  alertDuration : number = 3000;
  successMessage : string | null = null;
  errorMessage : string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private friendRequestService: FriendRequestService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.initOwner();
    this.initSearchForm();
  }

  private initSearchForm() {
    this.searchForm = this.formBuilder.group({
      pseudoToSearch: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  async onSearchSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    const pseudoToFind = this.searchForm.value.pseudoToSearch;

    try {
      await this.friendRequestService.createFriendRequest(pseudoToFind);
      this.successMessage = "Demande d'ami envoyée à " + pseudoToFind;

      //Show it for 4 seconds and refresh the page
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);

      this.searchForm.reset();
    } catch (e) {
      this.errorMessage = "Erreur lors de l'envoi de la demande d'ami à " + pseudoToFind + " : L'utilisateur n'existe pas ou vous etes déja en attente d'une réponse de sa part. ";

      //Show it for 4 seconds and refresh the page
      setTimeout(() => {
        this.errorMessage = null;
        this.refreshPage();
      }, this.alertDuration);
      this.searchForm.reset();
    }

  }

  private refreshPage() {
    location.reload();
  }

  initOwner(){
    this.owner = this.userService.getCurrentUserPseudo();
  }



}
