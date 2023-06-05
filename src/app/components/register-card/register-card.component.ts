import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {UserAPIService} from "../../_services/userAPI.service";
import {ISignUp} from "../../_interfaces/ISignUp";

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css'],
})
export class RegisterCardComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationFormSubmitted! : ISignUp;

  error = ''
  loadingSpinner = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userAPIService : UserAPIService) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: [null, [Validators.email]],
    });

    this.registrationFormSubmitted = {
      pseudo: '',
      password: '',
      email: null
    }
  }

  async onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.fillCompletedForm();

    try {
      const userTokenCreated = await this.userAPIService.signUp(this.registrationFormSubmitted).toPromise();
      //console.log("Welcome :" + JSON.stringify(userTokenCreated));
      await this.router.navigate(['/welcome']);
    } catch (error : any) {
      console.log(error);
      this.error = error.toString();
    }



    // Exemple de navigation vers une autre page
    // this.loadingSpinner = true;
    // this.router.navigate(['/welcome']);
  }

  fillCompletedForm() : void {
    const pseudoSubmitted = this.registrationForm.controls['pseudo'].value;
    const passwordSubmitted = this.registrationForm.controls['password'].value;
    const emailSubmitted = this.registrationForm.controls['email'].value;

    this.registrationFormSubmitted.pseudo = pseudoSubmitted;
    this.registrationFormSubmitted.password = passwordSubmitted;
    this.registrationFormSubmitted.email = emailSubmitted;
  }


}
