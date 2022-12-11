import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit(loginForm: NgForm) {
    const username = loginForm.value.username;
    this.loginService.login(username);
    loginForm.reset();
    this.router.navigate(['/']);
  }
}
