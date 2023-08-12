import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';
import { Comment } from 'src/app/types/comment';
import { User } from 'src/app/types/user';
import { SlicePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


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
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  currentUser: User | undefined;
  isOwnedByCurrentUser: boolean = false;
  truncatedDescriptionLength: number = 300;
  truncatedCommentLength: number = 50;
  showFullDescription: boolean = false;

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
    window.scrollTo(0, 0); 
    this.fetchBook();
    this.fetchUser();
    
  }

  fetchBook(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.apiService.getBook(id).subscribe((book) => {
      this.book = book;

      if (this.book.commentList && this.book.commentList.length > 0) {
        const totalRating = this.book.commentList.reduce((acc, comment) => acc + comment.rating, 0);
        this.book.rating = totalRating / this.book.commentList.length;
      }

      const loggedInUserId = this.userService.getCurrentUserId();
      this.isOwnedByCurrentUser = book.owner === loggedInUserId;
    })
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
  toggleComment() {
    this.showFullDescription = !this.showFullDescription;
  }

  fetchUser(): void {
    
    const username = this.userService.getCurrentUserUsername();
    if (username) {
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
    const bookName = this.activatedRoute.snapshot.params['name'];
    const currentUserId = this.userService.getCurrentUserId();

    if (currentUserId === null) {
      return;
    }

    const newComment: Comment = {
      comment: this.newCommentText,
      userId: { _id: currentUserId } as User,
      username: this.username,
      bookId: bookId,
      bookName: bookName,
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

  addToWishList(book: Book): void {
    if (!this.isLogged) {
      return;
    }
  
    this.userService.getProfile().subscribe((user) => {
      if (user) {
        console.log(user)
        const updatedUser = { ...user, wishList: [...user.wishList, book._id] };
  
        this.userService.updateProfile(updatedUser).subscribe(() => {
          // Update the user's wishList in the component if needed
          this.user$$.next(updatedUser);
          console.log('Book added to wish list');
        });
      }
    });
  }

}
