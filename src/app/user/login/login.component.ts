import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;

  constructor(private userService: UserService, private router: Router){

  }


  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;
    
    this.checkEmailRegistration(email).subscribe(isRegistered => {
      if (isRegistered) {
        this.userService.login(email, password).subscribe(() => {
          this.router.navigate(['/home']);
        });
      } else {       
        console.log('Email is not registered');
        // You can show an error message to the user here
      }
    }, error => {
      console.error('Error checking email registration:', error);
    });
  }

  private checkEmailRegistration(email: string): Observable<boolean> { // Specify the type
    // Implement the logic to check if the email is already registered
    // This might involve a call to your user service or API
    // For the sake of example, I'm returning a mock Observable
    return this.userService.checkEmailRegistration(email).pipe(
      catchError(err => {
        console.error('Error during email registration check:', err);
        return throwError(false); // Return false in case of error;
      })
      );
  }
}
