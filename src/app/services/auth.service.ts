import { Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';

@Injectable()
export class AuthService {
  private STORAGE_KEY = 'registeredUser';
  private SESSION_COOKIE = 'loggedInUser';
  users: UserInterface[] = [];
  testUser: UserInterface[] = [{ email: 'test@test.com', password: '1234' }];

  constructor() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.users = stored ? JSON.parse(stored) : this.testUser;
    this.saveUsers();
  }

  register(email: string, password: string): boolean {
    if (this.users.some((u) => u.email === email)) return false;
    this.users.push({ email, password });
    this.saveUsers();
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) return false;
    this.setCookie(this.SESSION_COOKIE, email, 30);
    return true;
  }

  logout() {
    this.deleteCookie(this.SESSION_COOKIE);
  }

  isLoggedIn(): boolean {
    return !!this.getCookie(this.SESSION_COOKIE);
  }

  private saveUsers() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
  }

  private setCookie(name: string, value: string, minutes: number) {
    const d = new Date();
    d.setTime(d.getTime() + minutes * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  private deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
}
