import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showLogin: boolean = false;

  // Function to toggle the visibility of the login component
  toggleLogin(): void {
    this.showLogin = !this.showLogin;
  }
}
