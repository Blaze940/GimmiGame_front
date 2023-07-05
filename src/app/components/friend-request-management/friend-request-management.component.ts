import { Component, OnInit } from '@angular/core';
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
  arrayRequestsSent : IFriendRequest [] = [];
  arrayRequestsReceived : IFriendRequest [] = [];

  //Tools
  loadingSpinner = false;
  showAlert = false;
  successMessage : string | null = null;
  errorMessage : string | null = null;
  alertDuration : number = 4000;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private friendRequestService: FriendRequestService
  ) { }

  ngOnInit(): void {
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
    this.loadingSpinner = true;
    this.showAlert = false;

    try {
      await this.friendRequestService.createFriendRequest(pseudoToFind);

      this.loadingSpinner = false;
      this.successMessage = "Demande d'ami envoyée à " + pseudoToFind;

      //Show it for 4 seconds and refresh the page
      setTimeout(() => {
        this.successMessage = null;
        this.refreshPage();
      }, this.alertDuration);

      this.searchForm.reset();
    } catch (e) {
      this.loadingSpinner = false;
      this.errorMessage = "Erreur lors de l'envoi de la demande d'ami à " + pseudoToFind + " : L'utilisateur n'existe pas ou vous etes déja en attente d'une réponse de sa part. ";

      //Show it for 4 seconds and refresh the page
      setTimeout(() => {
        this.errorMessage = null;
        this.refreshPage();
      }, this.alertDuration);
      this.searchForm.reset();

    }finally {
      console.log("Search form submitted");
      this.loadingSpinner = false;
    }

  }

  refreshPage() {
    this.router.navigateByUrl(this.router.url, {skipLocationChange: true}).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

}
