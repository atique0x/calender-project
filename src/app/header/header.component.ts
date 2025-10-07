import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticate = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.isAuthenticate = val));
  }

  onLogin() {
    const date = this.route.snapshot.queryParams['date'];
    this.router.navigate(['auth'], {
      queryParams: { date },
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onAddEvents() {
    this.router.navigate(['event-form']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
