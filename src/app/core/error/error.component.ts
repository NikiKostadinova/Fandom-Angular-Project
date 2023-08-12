import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{
  apiError$ = this.errorService.apiError$$.asObservable();
 

  errorMsg = '';

  constructor(private errorService: ErrorService) {}

   ngOnInit(): void {
    this.errorService.apiError$$.subscribe((error: any) => {
      if (error) {
       
        this.errorMsg = error.message || 'An error occurred.';
      } else {
        this.errorMsg = '';
      }
    });
   }

}
