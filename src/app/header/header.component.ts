import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticate = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth() {
    this.isAuthenticate = this.authService.isLoggedIn();
  }

  onLogin() {
    const date = this.route.snapshot.queryParams['date'];
    this.router.navigate(['auth'], {
      queryParams: { date },
    });
  }

  onAddEvents() {
    this.router.navigate(['event-form']);
  }

  onLogout() {
    this.authService.logout();
    this.checkAuth();
  }
}
