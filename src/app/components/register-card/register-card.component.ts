import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css'],
})
export class RegisterCardComponent implements OnInit {
  registrationForm!: FormGroup;
  error = '';
  loadingSpinner = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.email]],
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const username = this.registrationForm.controls['pseudo'].value;
    const password = this.registrationForm.controls['password'].value;
    const email = this.registrationForm.controls['email'].value;

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);

    // Exemple de navigation vers une autre page
    // this.loadingSpinner = true;
    // this.router.navigate(['/welcome']);
  }
}
