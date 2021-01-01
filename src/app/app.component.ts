import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from '@services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'WebQuizEngine';
  user: User;

  constructor(
	  private router: Router,
	  private authenticationService: AuthenticationService
  ) {
	  this.authenticationService.user.subscribe(user=>this.user=user);
  }

  logout() {
	  this.authenticationService.logout();
  }
}
