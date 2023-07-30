import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
// import { Image } from 'src/app/types/image'



@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  addBookSubmitHandler(form: NgForm): void {
    if(form.invalid) {
      console.log(`Invalid Form ${form}`)
      return;
    }
  

  const {name, author, image, published, genre, description} = form.value;
  
  this.apiService.create(name, author, image, published, genre, description).subscribe(() => {
    console.log(name, author, image, published, genre, description)    
    this.router.navigate(['/books'])
  })
}

  // book: Book = {
  //   name: '',
  //   author: '',
  //   image: {url: '', alt: ''},
  //   published: 0,
  //   genre: '',
  //   description: '',
  // }
  // submitted = false;

  // constructor(private apiService: ApiService) {}

  // ngOnInit(): void {   
  // }

  // saveBook(): void {
  //   const data = {
  //     name: this.book.name,
  //     author: this.book.author,
  //     image: this.book.image,
  //     published: this.book.published,
  //     genre: this.book.genre,
  //     description: this.book.description
  //   };

  //   this.apiService.create(data)
  //   .subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.submitted = true;
  //     },
  //     error: (err) => console.log(err)
  //   });
    
  // }

  // newBook(): void {
  //   this.submitted = false;
  //   this.book = {
  //     name: '',
  //     author: '',
  //     image: {url: '', alt: ''},
  //     published: 0,
  //     genre: '',
  //     description: '',
  //   }
  // }
}
