import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { matchPassValidator } from 'src/app/shared/validators/match-pass-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(5)]],
    email: ["", [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],    
    passGroup: this.fb.group({
      password: ["", [Validators.required, Validators.minLength(5)]],
      rePassword: ["", [Validators.required]]
    }, {
      validators: [matchPassValidator("password", "rePassword")]
    })
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  register(): void{
    if(this.form.invalid){
      return;
    }
    const { username, email, passGroup: {password, rePassword} = {} } = this.form.value;

    this.userService.register(username!, email!, password!, rePassword!).subscribe(() => {
      this.router.navigate(['/profile']);
     
    })
  }

}
