import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryRoutingModule } from './categories-routing.module';



@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoriesModule { }
