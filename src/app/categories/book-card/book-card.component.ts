import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';

import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit{

  booksList: Book[] = [];


  constructor(private apiService: ApiService, private userService: UserService) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({
      next: (books) => {
        
        books.sort((a, b) => new Date(b['createdAt']).getTime() - new Date(a['createdAt']).getTime());

        this.booksList = books.slice(0, 3);
       

      },
      error: (err) => {
        console.error(`Error: ${err}`);
      }
    })
  }

}
