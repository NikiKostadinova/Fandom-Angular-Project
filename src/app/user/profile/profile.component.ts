import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';
import { Book } from 'src/app/types/book';
import { ApiService } from 'src/app/api.service';

interface Profile {
  username: string;
  email: string;

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  wishListBooks: Book[] = [];
  profileDetails: Profile = {
    username: '',
    email: '',
   
  };

  get isLoggedIn (): boolean {
    return this.userService.isLogged
  }
  
  isEditMode: boolean = false;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    
    // ToDo: render this from the template and make more fields on click of a button
    // persons: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private userService: UserService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.fetchWishListBooks();
      }
    });
    const { username, email } = this.userService.user!;
    this.profileDetails = {
      username,
      email,
      
    };

    this.form.setValue({
      username,
      email,
      
    });
  }
  

  fetchWishListBooks(): void {
    if (this.user?.wishList) {
      this.apiService.getBooks().subscribe((books) => {
        this.wishListBooks = books.filter(book => this.user?.wishList.includes(book._id));
      });
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfileHandler(): void {
    if (this.form.invalid) {      
      return;
    }

    this.profileDetails = { ...this.form.value } as Profile;
    // const { username, email } = this.profileDetails;

    const updatedUser: User = {
      ...this.userService.user!,
      username: this.profileDetails.username,
      email: this.profileDetails.email,
    };

    // const headers = {
    //   Authorization: `Bearer ${this.userService.getToken()}`
    // };
   
    
    this.userService.updateProfile(updatedUser).subscribe(() => {
      this.toggleEditMode();
    });
  }
}


