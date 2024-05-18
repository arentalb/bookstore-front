import { Component } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent {
  books: any[] = [];
  isLoading = false;

  constructor(
    private bookService: BookService,
    private toaster: ToastrService,
    private router: Router,
  ) {}

  navigateToDetail(id: string) {
    this.router.navigate([`book/${id}`]);
  }

  ngOnInit() {
    this.isLoading = true;
    const formData = new FormData();
    this.bookService.getBooks().subscribe(
      (data) => {
        console.log(data);
        if (data) {
          console.log(data?.data);
          this.books = data?.data;
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.toaster.error(error?.error.message);
      },
    );
  }
}
