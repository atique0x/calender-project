import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isAuthenticate = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticate = this.authService.isLoggedIn();
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLogin) {
      const success = this.authService.login(email, password);
      if (success) this.router.navigate(['/']);
      else alert('Wrong credentials. Please login with correct one.');
    } else {
      const success = this.authService.register(email, password);
      if (!success) alert('User already exists. Try with new one.');
      else {
        alert('Registration successful. You can now login.');
        this.isLogin = true;
      }
    }
    form.reset();
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  backHome() {
    this.router.navigate(['/']);
  }
}
