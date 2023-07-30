import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';

import { AuthActivate } from '../core/guards/auth.activate';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';


const routes: Routes = [
    { path: 'categories', component: MainComponent },
    
    { path: 'books', component:  BooksComponent, canActivate: [AuthActivate]},
    { path: 'books/:id', component: BookDetailsComponent },
    { path: 'add', component: AddBookComponent },
    { path: 'books/:id/editBook', component: EditBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }