import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { RequestService } from '../../../services/request.service';
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
    _id: null,
    title: '',
    author: '',
    publisher: '',
    language: '',
    category: '',
    description: '',
    image: '',
  };
  requestStatus: string | null = null;

  constructor(
    private bookService: BookService,
    private requestService: RequestService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.bookService.getBookById(id).subscribe((response) => {
        this.book = response?.data;
        this.isLoading = false;
        this.checkRequestStatus();
      });
    }
  }

  reserveHandler(id: string) {
    this.requestService.createNewRequest(id).subscribe((response) => {
      this.isLoading = false;
      this.toaster.success('Request sent ');
      this.router.navigate(['/books']);
    });
  }

  checkRequestStatus(): void {
    this.requestService.getUserRequests().subscribe(
      (data: any) => {
        console.log('----');
        console.log(data.data);
        console.log(this.book._id);
        const request = data.data.find(
          (r: any) => r.book._id === this.book._id,
        );
        console.log(request);
        this.requestStatus = request ? request.status : null;
      },
      (error: any) => {
        console.error('Error fetching requests:', error);
        this.toaster.error(error?.error.message);
      },
    );
  }
}
