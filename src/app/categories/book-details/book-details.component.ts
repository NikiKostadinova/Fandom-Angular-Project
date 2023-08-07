import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';
import { Comment } from 'src/app/types/comment';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | undefined;
  newCommentText: string = '';
  newCommentRating: number = 0;  
  username: string = '';

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
    this.fetchUser();

  }

  fetchBook(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.apiService.getBook(id).subscribe((book) => {
      this.book = book;

      if(this.book.commentList && this.book.commentList.length > 0) {
        const totalRating = this.book.commentList.reduce((acc, comment) => acc + comment.rating, 0);
        this.book.rating = totalRating / this.book.commentList.length;
      }
    })
  }

  fetchUser(): void {
    // const username = this.activatedRoute.snapshot.params['username'];

    const username = this.userService.getCurrentUserUsername();
    if(username){
      this.username = username;
    }
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

 

  setRating(rating: number): void {
    this.newCommentRating = rating;
  }

  onSubmitComment(): void {
    if (this.newCommentText.trim() === '') {
      return;
    }    

    const bookId = this.activatedRoute.snapshot.params['id'];
    const currentUserId = this.userService.getCurrentUserId(); 

    if(currentUserId === null){
      return;
    }

    const newComment: Comment = {      
      comment: this.newCommentText,
      userId: {_id :currentUserId} as User,
     username: this.username,
      bookId: bookId,
      rating: this.newCommentRating
    };

    if (this.book) {
      this.book.commentList.push(newComment);     
   

    this.apiService.updateBookWithComment(this.book).subscribe((updatedBook) => {
      this.book = updatedBook;     

      this.newCommentText = '';    
      this.newCommentRating = 0;
    })
  }
  }
}
