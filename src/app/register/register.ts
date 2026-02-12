import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  showPassword: boolean = false;

  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{3,5}[a-zA-Z]{3,5}$/),
    ]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  displayPassword() {
    this.showPassword = !this.showPassword;
  }

  submitRegisterForm(form: FormGroup) {
    console.log(form.value);
  }

  get f() {
    return this.registerForm.controls;
  }
}
