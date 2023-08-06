import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Comment } from '../types/comment';
import { Book } from '../types/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentsList: Comment[] = [];
  thereAreNoComments: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.apiService.getBookComments(bookId).subscribe((comments) => {

        this.commentsList = comments;

        if (this.commentsList.length === 0) {
          this.thereAreNoComments = true;
        }
      });
    }


  }
}


