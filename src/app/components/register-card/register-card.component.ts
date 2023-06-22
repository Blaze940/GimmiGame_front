import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NavigationExtras, Router} from "@angular/router";
import { UserAPIService } from "../../_services/userAPI.service";
import { ISignUp } from "../../_interfaces/ISignUp";
import { IToken } from "../../_interfaces/IToken";
import { TokenService } from "../../_services/token.service";
import {UserService} from "../../_services/user.service";

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
    private userService : UserService
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
    this.registrationFormSubmitted = this.registrationForm.value;

    try {
      await this.userService.register(this.registrationFormSubmitted);

      this.successMessage =
        "Bienvenue dans ton monde " + this.registrationFormSubmitted.pseudo +" !";
      this.registrationForm.reset();

      //Timeout to let the user read the success message
      setTimeout(() => {
        this.router.navigate(['/']).then(() => {
          window.location.href = '/?refresh=true';
        });
      }, 3000);

    } catch (error: any) {
      this.errorMessage = "Ce pseudo ou cette adresse email existe déjà.";
      this.showStatusMessage = true;
    } finally {
      this.loadingSpinner = false;
    }
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
