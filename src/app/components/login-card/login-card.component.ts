import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ISignUp} from "../../_interfaces/ISignUp";
import {UserAPIService} from "../../_services/callAPI/userAPI.service";
import {TokenService} from "../../_services/token.service";
import {ISignIn} from "../../_interfaces/ISignIn";
import {IToken} from "../../_interfaces/IToken";
import {UserService} from "../../_services/user.service";

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


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  async onSubmit() : Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loadingSpinner = true;
    this.loginFormSubmitted = this.loginForm.value;

    try {
      await this.userService.login(this.loginFormSubmitted);

      this.successMessage =
        "Heureux de te revoir " + this.loginFormSubmitted.pseudo +" !";
      this.loginForm.reset();


      //Timeout to let the user read the success message
      setTimeout(() => {
        this.router.navigate(['/']).then(() => {
          window.location.href = '/?refresh=true';
        });
      }, 3000);

    } catch (error: any) {
      this.errorMessage = "Pseudo ou mot de passe incorrect.";
    } finally {
      this.loadingSpinner = false;
    }
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
