import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5000/api/book';
  private uploadUrl = 'http://localhost:5000/api/upload';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBookById(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  updateBook(book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${book._id}`, book);
  }

  deleteBook(book: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${book._id}`);
  }

  addImage(image: any): Observable<any> {
    return this.http.post<any>(this.uploadUrl, image);
  }
}
