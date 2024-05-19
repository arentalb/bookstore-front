import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { categories, languages } from '../../../../utils/constants'; // Adjust the path as needed

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

  languages = languages;
  categories = categories;

  constructor(
    private bookService: BookService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = Boolean(id);
      this.bookService.getBookById(id).subscribe((response) => {
        console.log(response);
        this.book = response?.data;
      });
    }
  }

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

  onUpdateClick(bookForm: NgForm): void {
    if (bookForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        this.bookService.addImage(formData).subscribe(
          (response: any) => {
            this.book.image = response.data;
            this.toaster.success('Image uploaded');
            this.bookService.updateBook(this.book).subscribe(
              (response: any) => {
                this.toaster.success('Product updated');
                this.router.navigate(['/admin/books']);
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
        this.bookService.updateBook(this.book).subscribe(
          (response: any) => {
            this.toaster.success('Product updated');
            this.router.navigate(['/admin/books']);
          },
          (error: any) => {
            console.log('Error:', error);
            this.toaster.error(error?.error.message);
          },
        );
      }
    }
  }

  onDeleteClick(bookForm: NgForm): void {
    if (confirm('Are you sure you want to delete this book ?')) {
      this.bookService.deleteBook(this.book).subscribe(
        (response: any) => {
          this.toaster.success('Product deleted');
          this.router.navigate(['/admin/books']);
        },
        (error: any) => {
          console.log('Error:', error);
          this.toaster.error(error?.error.message);
        },
      );
    }
  }

  onSubmitClick(form: NgForm): void {
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
