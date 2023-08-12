import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { SlicePipe } from 'src/app/shared/pipes/slice.pipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksList: Book[] = [];
  showFullDescription: boolean = false;
  truncatedDescriptionLength: number = 300;

  constructor(private apiService: ApiService, private userService: UserService) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({
      next: (books) => {
        // console.log(books)
        // books.sort((a, b) => new Date(b['createdAt']).getTime() - new Date(a['createdAt']).getTime());

        // this.booksList = books.slice(0, 3);
        this.booksList = books;

      },
      error: (err) => {
        console.error(`Error: ${err}`);
      }
    })
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }


}
