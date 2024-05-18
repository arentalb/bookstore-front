import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/common/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BookFormComponent } from './components/admin/books/book-form/book-form.component';
import { BookListComponent } from './components/admin/books/book-list/book-list.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { StudentListComponent } from './components/admin/student/student-list/student-list.component';
import { StudentFormComponent } from './components/admin/student/student-form/student-form.component';
import { BooksComponent } from './components/user/books/books.component';
import { BookDetailComponent } from './components/user/book-detail/book-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', component: BooksComponent },
      { path: 'book/:id', component: BookDetailComponent },
    ],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'student/new', component: StudentFormComponent },
      { path: 'books', component: BookListComponent },
      { path: 'book/new', component: BookFormComponent },
      { path: 'book/edit/:id', component: BookFormComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
