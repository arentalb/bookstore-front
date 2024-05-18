import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  login(user: any): boolean {
    // Implement your authentication logic here
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.cookieService.set('jwt', 'Hello World');
    this.router.navigate(['/home']);
    return true;
  }

  logout(): void {
    localStorage.removeItem('userInfo');
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('userInfo') !== null;
  }

  isAdmin(): boolean {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const user = JSON.parse(userInfoString);
      return user.isAdmin === true;
    }
    return false;
  }
}
