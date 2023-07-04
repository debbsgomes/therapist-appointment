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
  loggedInUser: string = '';
  signInData: User = {
    id: uuidv4(),
    name: '',
    email: '',
    password: ''
  };
  confirmPassword: string = '';
  showSignInForm: boolean = false;
  showMessage: boolean = false;
  signInClicked: boolean = false;
  modalVisible: boolean = true;
  modalOpen: boolean = true;
  isSignInButtonDisabled: boolean = true;
  isRegistered: boolean = false;
  
  emailInvalid = false;

  constructor(public authenticationService: AuthenticationService) {}

  login() {
    this.authenticationService.login(this.email, this.password).subscribe(result => {
      if (result) {
        this.loggedInUser = this.authenticationService.getLoggedInUser();
        this.showMessage = true;
      } else {
        this.loggedInUser = '';
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.loggedInUser = '';

  }

  
  isSignInFormValid(): boolean {
    return (
      !!this.signInData.name &&
      !!this.signInData.email &&
      !!this.signInData.password &&
      !!this.confirmPassword &&
      this.signInData.password === this.confirmPassword
    );
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
      this.isRegistered = true;
    }, error => {
      console.error('Sign-in failed:', error);
    });
  }

  cancelSignIn() {
    if (!this.signInClicked) {
      this.showSignInForm = false;
      this.signInClicked = false;
    }
  }

  handleModalClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isButton = target.tagName.toLowerCase() === 'button';
    const isInsideModal = target.closest('.modal-content') !== null;
  
    if (!isButton || !isInsideModal) {
      // Clicked outside the modal or not on a button, prevent the click event
      event.stopPropagation();
      event.preventDefault();
    }
  }

  validateEmail() {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.emailInvalid = !emailRegex.test(this.signInData.email);
  }
}

