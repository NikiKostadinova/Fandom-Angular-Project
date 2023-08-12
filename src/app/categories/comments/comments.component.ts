import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Comment } from '../../types/comment';
import { Book } from '../../types/book';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/types/user';
// import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentsList: Comment[] = [];
  thereAreNoComments: boolean = false;
  book: Book | undefined;
  newCommentText: string = '';
  newCommentRating: number = 0;  
  username: string = '';
  activatedRoute: any;
  

  truncatedCommentLength: number = 50;
  showFullDescription: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute,private userService: UserService,
    private router: Router) { 
      this.activatedRoute = route;
    }

  ngOnInit(): void {
    window.scrollTo(0, 0); 
    this.fetchUser();

    const bookId = this.route.snapshot.paramMap.get('id');
   

    if (bookId) {
      this.apiService.getBook(bookId).subscribe((book) => {
        this.book = book; 
      })
      this.apiService.getBookComments(bookId).subscribe((comments) => {
       
        this.commentsList = comments;

        if (this.commentsList.length === 0) {
          this.thereAreNoComments = true;
        }
      });
    }


  }

  toggleComment() {
    this.showFullDescription = !this.showFullDescription;
  }

  fetchUser(): void {
    
    const username = this.userService.getCurrentUserUsername();
    if(username){
      this.username = username;
    }
  }

  setRating(rating: number): void {
    this.newCommentRating = rating;
  }

  calculateAverageRating(): number {
    if (!this.book || this.book.commentList.length === 0) {
      return 0;
    }

    const totalRating = this.book.commentList.reduce((acc, comment) => acc + comment.rating, 0);
    return totalRating / this.book.commentList.length;
  }

  onSubmitComment(): void {
    if (this.newCommentText.trim() === '') {
      return;
    }    
      
    const bookId = this.activatedRoute.snapshot.params['id'];   
    const bookName = this.activatedRoute.snapshot.params['name'];
    const currentUserId = this.userService.getCurrentUserId(); 
    if(currentUserId === null){
      return;
    }

    const newComment: Comment = {      
      comment: this.newCommentText,
      userId: {_id :currentUserId} as User,
     username: this.username,
      bookId: bookId,
      bookName:bookName,
      rating: this.newCommentRating
    };

    if (this.book) {
      this.book.commentList.push(newComment);    
      
      const totalRating = this.book.commentList.reduce((acc, comment) => acc + comment.rating, 0);
      this.book.rating = totalRating / this.book.commentList.length;
   

    this.apiService.updateBookWithComment(this.book).subscribe((updatedBook) => {
      this.book = updatedBook;     
      this.newCommentText = '';    
      this.newCommentRating = 0;

      
        

      // window.location.reload();
    })
  }
  }
}


