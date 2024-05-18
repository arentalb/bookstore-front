import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit {
  isLoading = false;
  isAvailable = true;
  book: any = {
    id: null,
    title: '',
    author: '',
    publisher: '',
    language: '',
    category: '',
    description: '',
    image: '',
  };

  constructor(
    private bookService: BookService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.bookService.getBookById(id).subscribe((response) => {
        console.log(response);
        this.book = response?.data;
        console.log(this.book);
        this.isLoading = false;
      });
    }
  }
}
