import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { ToastrService } from 'ngx-toastr';

export interface TRequest {
  _id?: string;
  book: {
    title: string;
  };
  user: {
    username: string;
    email: string;
  };
  status: string;
  updatedAt?: Date;
  reservedUntil?: Date;
}

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
})
export class ReservationListComponent implements OnInit {
  requests: TRequest[] = [];
  isLoading: boolean = true;

  constructor(
    private requestService: RequestService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.requestService.getAllReservations().subscribe(
      (data: any) => {
        this.requests = data.data;
        this.isLoading = false;
        console.log(data.data);
      },
      (error) => {
        this.isLoading = false;
        this.toaster.error(error?.error.message);
      },
    );
  }

  isExpired(reservedUntil?: Date): boolean {
    if (!reservedUntil) {
      return false;
    }
    const currentDate = new Date();
    const targetDate = new Date(reservedUntil);
    return currentDate > targetDate;
  }

  daysUntilExpiration(reservedUntil?: Date): number {
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
