import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { CategoryRoutingModule } from './categories-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookCardComponent } from './book-card/book-card.component';
import { CommentsComponent } from './comments/comments.component';



@NgModule({
  declarations: [
    BooksComponent,    
    AddBookComponent,
    BookDetailsComponent,
    EditBookComponent,
    BookCardComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    BookCardComponent
  ]
})
export class CategoriesModule { }
