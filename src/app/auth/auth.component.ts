import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    if (this.isLogin) {
      if (this.authService.login(email, password)) {
        this.navigateBack();
      } else alert('Wrong credentials. Please login with correct one.');
    } else {
      if (this.authService.register(email, password)) {
        alert('Registration successful. You can now login.');
        this.isLogin = true;
      } else {
        alert('User already exists. Try with a new one.');
      }
    }
    form.reset();
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  backHome() {
    this.navigateBack();
  }

  private navigateBack() {
    const date = this.route.snapshot.queryParams['date'];
    this.router.navigate(['/calender'], {
      queryParams: date ? { date } : {},
    });
  }
}
