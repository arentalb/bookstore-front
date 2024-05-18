import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
  isEditMode: boolean = false;
  book: any = {
    id: null,
    title: '',
    author: '',
    publisher: '',
    language: '',
    category: '',
    description: '',
  };

  selectedFile: File | null = null;

  constructor(
    private bookService: BookService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {}

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.toaster.warning('No file selected');
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.selectedFile) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        this.bookService.addImage(formData).subscribe(
          (response: any) => {
            this.book.image = response.data;
            this.toaster.success('Image uploaded');
            this.bookService.addBook(this.book).subscribe(
              (response: any) => {
                this.toaster.success('Product added');
                this.resetForm(form);
              },
              (error: any) => {
                console.log('Error:', error);
                this.toaster.error(error?.error.message);
              },
            );
          },
          (error: any) => {
            console.log('Error:', error);
            this.toaster.error(error?.error.message);
          },
        );
      } else {
        this.toaster.error('No file selected');
      }
    } else {
      this.toaster.error('Fill out all inputs');
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.book = {
      id: null,
      title: '',
      author: '',
      publisher: '',
      language: '',
      category: '',
      description: '',
    };
    this.selectedFile = null;
  }
}
