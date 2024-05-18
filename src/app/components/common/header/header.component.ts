import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.http.post('/api/user/logout', {}).subscribe(
      (response: any) => {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.toaster.success('logout success');
      },
      (error: any) => {
        console.log(error?.error.message);
        this.toaster.error(error?.error.message);
      },
    );
  }
}
