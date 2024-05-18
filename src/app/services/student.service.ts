import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getStudentById(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  registerStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, student);
  }

  updateStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${student._id}`, student);
  }

  deleteStudent(student: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${student._id}`);
  }
}
