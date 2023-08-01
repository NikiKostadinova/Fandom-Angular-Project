import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService: ApiService, private userService: UserService) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }


  // showLogin: boolean = false;

  // // Function to toggle the visibility of the login component
  // toggleLogin(): void {
  //   this.showLogin = !this.showLogin;
  // }
}
