import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{3,5}[a-zA-Z]{3,5}$/),
    ]),
  });

  displayPassword() {
    this.showPassword = !this.showPassword;
  }
  submitLoginForm(form: FormGroup) {
    console.log(form);
  }
}
