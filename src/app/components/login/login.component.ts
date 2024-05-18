import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toaster: ToastrService,
  ) {}

  onSubmit() {
    const user = { email: this.email, password: this.password };
    this.http
      .post('/api/user/login', user, { withCredentials: true })
      .subscribe(
        (response: any) => {
          this.authService.login(response.data);
          if (response.data.isAdmin) {
            console.log('adminnnn');
            this.router.navigate(['/admin']);
          } else {
            console.log('userrr');
            this.router.navigate(['/home']);
          }
          this.toaster.success('Login success');
        },
        (error: any) => {
          console.log(error?.error.message);
          this.toaster.error(error?.error.message);
          // alert('Login failed. Please check your credentials.');
        },
      );
  }
}
