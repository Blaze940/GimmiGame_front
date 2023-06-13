import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NavigationExtras, Router} from "@angular/router";
import { UserAPIService } from "../../_services/userAPI.service";
import { ISignUp } from "../../_interfaces/ISignUp";
import { IToken } from "../../_interfaces/IToken";
import { TokenService } from "../../_services/token.service";

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css'],
})
export class RegisterCardComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationFormSubmitted!: ISignUp;
  errorMessage = '';
  successMessage = '';

  loadingSpinner = false;
  showStatusMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userAPIService: UserAPIService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  async onSubmit(): Promise<void> {
    if (this.registrationForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loadingSpinner = true;
    this.showStatusMessage = false;
    this.fillCompletedForm();

    try {
      const userTokenCreated: IToken | undefined = await this.userAPIService.signUp(this.registrationFormSubmitted).toPromise();

      if(userTokenCreated) {
        this.tokenService.saveToken(userTokenCreated.token);
      }
      this.successMessage =
        "Bienvenue dans ton monde " + this.registrationFormSubmitted.pseudo +" !";
      this.registrationForm.reset();

      //Timeout to let the user read the success message
      setTimeout(() => {
        this.router.navigate(['/welcome']);
      }, 3000);

    } catch (error: any) {
      this.errorMessage = "Ce pseudo ou cette adresse email existe déjà.";
      this.showStatusMessage = true;
    } finally {
      this.loadingSpinner = false;
    }
  }

  private fillCompletedForm(): void {
    this.registrationFormSubmitted.pseudo = this.registrationForm.controls['pseudo'].value;
    this.registrationFormSubmitted.password = this.registrationForm.controls['password'].value;
    this.registrationFormSubmitted.email = this.registrationForm.controls['email'].value;
  }

  private initRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: [null, [Validators.email]],
    });

    this.registrationFormSubmitted = {
      pseudo: '',
      password: '',
      email: null
    };
  }
}
