import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  isLoading = false;

  constructor(
    private bookService: BookService,
    private toaster: ToastrService,
    private router: Router,
  ) {}

  navigateToEdit(id: string) {
    this.router.navigate([`/admin/book/edit/${id}`]);
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
