import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { categories, languages } from '../../../utils/constants'; // Adjust the path as needed

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

  languages = languages;
  categories = categories;

  constructor(
    private bookService: BookService,
    private toaster: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) {}

  navigateToDetail() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/login`]);
    } else {
      this.router.navigate([`/books`]);
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
