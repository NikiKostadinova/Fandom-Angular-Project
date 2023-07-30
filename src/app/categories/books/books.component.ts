import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';

import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksList: Book[] = [];


  constructor(private apiService: ApiService, private userService: UserService) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({      
      next: (books) => {
       
        this.booksList = books;

      },
      error: (err) => {
        console.error(`Error: ${err}`);
      }
    })
  }

  
}
