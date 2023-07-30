import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { catchError, tap } from 'rxjs';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book!: Book;
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetchBook();
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      published: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  fetchBook(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.apiService.getBook(id).subscribe((book) => {
      this.book = book;
      this.bookForm.patchValue({
        name: this.book.name,
        author: this.book.author,
        image: this.book.image,
        published: this.book.published,
        genre: this.book.genre,
        description: this.book.description
      });
    });
  }

 
  onSubmit(): void {
    if(this.bookForm.invalid) {
      return;
    }

    const formData = this.bookForm.value;
    const bookToUpdate: Book = { ...this.book, ...formData};   

    this.apiService.updateBook(bookToUpdate).pipe(tap((updatedBook) => {
       console.log('Book updated successfully', updatedBook);
       this.router.navigate(['/books', updatedBook._id])
    }),
    catchError((error) => {
      console.error('Error updating book:', error);
      return [];
    })
    ).subscribe();
  }

  //  bookDetails: Book = {
  //   name: '',
  //   author: '',
  //   image: {url: '', alt: ''},
  //   published: 0,
  //   genre: '',
  //   description: ''
  //  }

  //  form = this.fb.group({
  //   name: ['', Validators.required],
  //   author: ['', Validators.required],
  //   image: ['', Validators.required],
  //   published: ['', Validators.required],
  //   genre: ['', Validators.required],
  //   description: ['', Validators.required],
  //  })

  //  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  //  ngOnInit(): void {
  //    const { name, author, image, published, genre, description } = this.apiService.book!;
  //    this.bookDetails = {
  //     name, 
  //     author, 
  //     image, 
  //     published, 
  //     genre, 
  //     description
  //    };

  //    this.form.setValue({
  //     name, 
  //     author, 
  //     image, 
  //     published, 
  //     genre, 
  //     description
  //    });
  //  }

  //  saveBookHandler(): void {
  //   if(this.form.invalid){
  //     return;
  //   }

  //   this.bookDetails = { ...this.form.value } as Book;
  //   const { name, author, image, published, genre, description } = this.bookDetails;

  //   this.apiService.updateBook(name!, author!, image!, published!, genre!, description!).subscribe(() => {

  //   })
  //  }

}

