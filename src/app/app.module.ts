import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { LayoutComponent } from './components/common/layout/layout.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/user/home/home.component';
import { AdminBooksComponent } from './components/admin/admin-books/admin-books.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AdminDashboardComponent,
    HomeComponent,
    AdminBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
    }),
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
