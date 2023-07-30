import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from './types/book';
import { Image } from './types/image';
import { User } from './types/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBooks() {
    const { apiUrl } = environment;



    return this.http.get<Book[]>(`${apiUrl}/api/books`);

  }

  getBook(id: any): Observable<Book> {
    const { apiUrl } = environment;

    return this.http.get<Book>(`${apiUrl}/api/books/${id}`);

  }

  updateBook(bookToUpdate: Book): Observable<Book> {
    const { apiUrl } = environment;
    // const url = `${apiUrl}/api/books/${bookToUpdate.id}`;

    return this.http.put<Book>(`${apiUrl}/api/books/${bookToUpdate._id}/editBook`, bookToUpdate);
  }



  // updateBook(name: string, author: string, image: {url: string, alt: string}, published: number, genre: string, description: string) {
  //   const { apiUrl } = environment;    

  //   return this.http.put<Book>(`${apiUrl}/books/${id}`, book);


  // }

  // create(data: any): Observable<any> {
  //   const { apiUrl } = environment;
  //   return this.http.post(apiUrl, data);
  // }

  create(name: string, author: string, image: Image, published: number, genre: string, description: string) {
    const { apiUrl } = environment; 
    return this.http.post<Book>(`${apiUrl}/api/books/create`, { name, author, image, published, genre, description });
  }

  // deleteBook(id: string) {
  //   const { apiUrl } = environment;
  //   const url = `${apiUrl}/api/books/${id}`;
  //   return this.http.delete(url);

  // }

}
