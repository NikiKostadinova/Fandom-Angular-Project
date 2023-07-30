import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | undefined;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.fetchBook();

  }

  fetchBook(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id)

    this.apiService.getBook(id).subscribe((book) => {
      this.book = book;
      console.log(this.book)
    })
  }

  onDeleteBook(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.apiService.deleteBook(id).subscribe(() => {
      console.log('Book deleted successfully!');
      this.router.navigate(['/books'])
    },
    (error) => {
      console.error('Error deleting book:', error);
    })
  }
}
