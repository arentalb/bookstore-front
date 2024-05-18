import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { LayoutComponent } from './components/common/layout/layout.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BookListComponent } from './components/admin/books/book-list/book-list.component';
import { BookFormComponent } from './components/admin/books/book-form/book-form.component';
import { AuthInterceptor } from './interceptures/auth.interceptor';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { StudentFormComponent } from './components/admin/student/student-form/student-form.component';
import { StudentListComponent } from './components/admin/student/student-list/student-list.component';
import { BooksComponent } from './components/user/books/books.component';
import { BookDetailComponent } from './components/user/book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    BookListComponent,
    BookFormComponent,
    DashboardComponent,
    StudentFormComponent,
    StudentListComponent,
    BooksComponent,
    BookDetailComponent,
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
  providers: [
    CookieService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
