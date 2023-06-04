import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';
  loadingSpinner = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // Exemple de gestion de la soumission du formulaire
    const pseudo = this.loginForm.controls['pseudo'].value;
    const password = this.loginForm.controls['password'].value;





    console.log('Pseudo:', pseudo);
    console.log('Mot de passe:', password);

    // Exemple de navigation vers une autre page
    // this.loadingSpinner = true;
    // this.router.navigate(['/welcome']);
  }
}
