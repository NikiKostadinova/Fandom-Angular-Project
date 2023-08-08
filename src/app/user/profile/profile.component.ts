import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { UserService } from '../user.service';

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

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
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
  // pagination
  // records => 1000
  // 10 records per page -> page: 100
  // 10 records => 4 => offset= 4, limit = 10

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfileHandler(): void {
    if (this.form.invalid) {      
      return;
    }

    this.profileDetails = { ...this.form.value } as Profile;
    const { username, email } = this.profileDetails;
   
    this.userService.updateProfile(username!, email!,).subscribe(() => {
      this.toggleEditMode();
    });
  }
}


