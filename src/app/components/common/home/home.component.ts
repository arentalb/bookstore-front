import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  isLoading = false;
  searchQuery: string = '';
  selectedLanguage: string = '';
  selectedCategory: string = '';

  languages: string[] = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Russian',
    'Other',
  ];

  categories: string[] = [
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Non-Fiction',
    'Other',
  ];

  constructor(
    private bookService: BookService,
    private toaster: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) {}

  navigateToDetail() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`books`]);
    } else {
      this.router.navigate([`login`]);
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.bookService.getBooks().subscribe(
      (data) => {
        console.log(data);
        if (data) {
          console.log(data?.data);
          this.books = data?.data;
          this.filteredBooks = this.books;
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.toaster.error(error?.error.message);
      },
    );
  }

  onSearch() {
    this.filteredBooks = this.books.filter((book) => {
      const matchesSearchQuery =
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesLanguage =
        !this.selectedLanguage || book.language === this.selectedLanguage;

      const matchesCategory =
        !this.selectedCategory || book.category === this.selectedCategory;

      return matchesSearchQuery && matchesLanguage && matchesCategory;
    });
  }
}
