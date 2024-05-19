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
  createdAt?: Date;
  reservedUntil?: string;
  numberOfDay: number;
}

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
})
export class RequestListComponent implements OnInit {
  requests: TRequest[] = [];
  isLoading: boolean = true;
  statuses = ['Pending', 'Approved'];

  constructor(
    private requestService: RequestService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.requestService.getAllRequests().subscribe(
      (data: any) => {
        this.requests = data.data.map((request: TRequest) => {
          const numberOfDay = request.reservedUntil
            ? calculateDaysFromNow(request.reservedUntil)
            : 5;
          return {
            ...request,
            numberOfDay,
          };
        });
        this.isLoading = false;
        console.log(data.data);
      },
      (error) => {
        this.isLoading = false;
        this.toaster.error(error?.error.message);
      },
    );
  }

  updateRequest(request: TRequest) {
    console.log('Current selected status for request:', request);
    const requestId = request._id;
    const updatedStatus = request.status;
    const reservedUntil: string = addDaysToDate(request.numberOfDay); // Use request.numberOfDay

    if (requestId && updatedStatus) {
      this.requestService
        .updateRequestStatus(requestId, updatedStatus, reservedUntil)
        .subscribe(
          (data: any) => {
            console.log(data.data);
            this.toaster.success(`Status Updated to ${request.status}`);
          },
          (error) => {
            this.toaster.error(error?.error.message);
          },
        );
    }
  }
}

function addDaysToDate(days: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate.toISOString();
}

function calculateDaysFromNow(isoDateString: string): number {
  const currentDate = new Date();
  const targetDate = new Date(isoDateString);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);
  return Math.round(dayDifference);
}
