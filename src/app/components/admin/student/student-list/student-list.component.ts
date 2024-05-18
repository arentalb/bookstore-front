import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private toaster: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.studentService.getStudents().subscribe(
      (data) => {
        console.log(data);
        if (data) {
          console.log(data?.data);
          this.students = data?.data;
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
