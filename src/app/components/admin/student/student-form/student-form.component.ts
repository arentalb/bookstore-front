import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { categories, who } from '../../../../utils/constants'; // Adjust the path as needed

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent {
  student: any = {
    username: '',
    email: '',
    password: '',
  };
  who = who;
  protected readonly categories = categories;

  constructor(
    private studentService: StudentService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  onSubmitClick(form: NgForm): void {
    if (form.valid) {
      this.studentService.registerStudent(this.student).subscribe(
        (response: any) => {
          this.toaster.success('User registered');
          this.resetForm(form);
        },
        (error: any) => {
          console.log('Error:', error);
          this.toaster.error(error?.error.message);
        },
      );
    } else {
      this.toaster.error('Fill out all inputs');
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.student = {
      username: '',
      email: '',
      password: '',
    };
  }
}
