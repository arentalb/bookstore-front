import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = `http://localhost:5000/api/requests`;

  constructor(private http: HttpClient) {}

  updateRequestStatus(
    requestedId: string,
    status: string,
    reservedUntil: string,
  ) {
    return this.http.put<any>(`${this.apiUrl}/update/${requestedId}`, {
      status,
      reservedUntil,
    });
  }

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations`);
  }
}
