import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ISignUp} from "../../_interfaces/ISignUp";
import {UserAPIService} from "../../_services/userAPI.service";
import {TokenService} from "../../_services/token.service";
import {ISignIn} from "../../_interfaces/ISignIn";

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  loginForm!: FormGroup;
  loginFormSubmitted!: ISignIn;
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
    this.initLoginForm();
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loadingSpinner = true;
    this.showStatusMessage = false;
    this.fillCompletedForm();

    try {
      const userTokenCreated = await this.userAPIService.signIn(this.loginFormSubmitted).toPromise();

      if(userTokenCreated) {
        this.tokenService.saveToken(userTokenCreated.token);
      }

      this.successMessage =
        "Heureux de te revoir " + this.loginFormSubmitted.pseudo +" !";
      this.loginForm.reset();

      //Timeout to let the user read the success message
      setTimeout(() => {
        this.router.navigate(['/welcome']);
      }, 3000);

    } catch (error: any) {
      this.errorMessage = "Pseudo ou mot de passe incorrect.";
      this.showStatusMessage = true;
    } finally {
      this.loadingSpinner = false;
    }
  }

  private fillCompletedForm(): void {
    this.loginFormSubmitted.pseudo = this.loginForm.controls['pseudo'].value;
    this.loginFormSubmitted.password = this.loginForm.controls['password'].value;
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    });

    this.loginFormSubmitted = {
      pseudo: '',
      password: '',
    };
  }
}
