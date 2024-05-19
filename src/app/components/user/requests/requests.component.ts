import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { RequestService } from '../../../services/request.service';
import { ToastrService } from 'ngx-toastr';

export interface TRequest {
  _id?: string;
  book: {
    title: string;
  };
  status: string;
  createdAt?: Date;
  reservedUntil?: string;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
})
export class RequestsComponent implements OnInit {
  isLoading = false;
  requests: TRequest[] = [];

  constructor(
    private bookService: BookService,
    private requestService: RequestService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.requestService.getUserRequests().subscribe(
      (data: any) => {
        this.requests = data.data;
        console.log(data.data);
      },
      (error: any) => {
        console.error('Error fetching requests:', error);
        this.toaster.error(error?.error.message);
      },
    );
  }

  isExpired(reservedUntil?: string | Date, status?: string): boolean {
    if (status === 'Pending' || status === 'Rejected') {
      return false; // Do not consider pending or rejected requests as expired
    }
    if (!reservedUntil) {
      return true; // Consider requests without a reservedUntil date as expired
    }
    const currentDate = new Date();
    const targetDate = new Date(reservedUntil);
    return currentDate > targetDate;
  }

  daysUntilExpiration(reservedUntil?: string | Date): number {
    if (!reservedUntil) {
      return 0;
    }
    const currentDate = new Date();
    const targetDate = new Date(reservedUntil);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return Math.round(dayDifference);
  }
}
