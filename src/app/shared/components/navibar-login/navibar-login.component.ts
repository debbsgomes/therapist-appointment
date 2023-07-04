import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/user.model';
import { v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-navibar-login',
  templateUrl: './navibar-login.component.html',
  styleUrls: ['./navibar-login.component.scss']
})
export class NavibarLoginComponent {
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  signInData: User = {
    id: uuidv4(),
    name: '',
    username: '',
    cellphoneNumber: 0,
    email: '',
    password: ''
  };
  confirmPassword: string = '';
  showSignInForm: boolean = false;

  constructor(public authenticationService: AuthenticationService) {}

  login() {
    this.authenticationService.login(this.email, this.password).subscribe(result => {
      if (result) {
        this.isLoggedIn = true;
        this.loggedInUser = this.authenticationService.getLoggedInUser();
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = '';
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = '';

  }

  signIn() {
    // Perform validation checks, such as password matching
    if (this.signInData.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    // Make the sign-in API call using the authentication service
    this.authenticationService.signup(this.signInData).subscribe(() => {
      console.log('Sign-in successful!');
      this.showSignInForm = false;
    }, error => {
      console.error('Sign-in failed:', error);
    });
  }

  cancelSignIn() {
    this.showSignInForm = false;
  }
}
