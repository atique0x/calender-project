import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticate = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth() {
    this.isAuthenticate = this.authService.isLoggedIn(); // CHANGED
  }

  onLogin() {
    this.router.navigate(['auth']);
  }

  onAddEvents() {
    this.router.navigate(['event-form']);
  }

  onLogout() {
    this.authService.logout();
    this.checkAuth();
  }
}
