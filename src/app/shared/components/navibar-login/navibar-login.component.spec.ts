import { NavibarLoginComponent } from './navibar-login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/user.model';
import { of, throwError } from 'rxjs';

describe('NavibarLoginComponent', () => {
  let component: NavibarLoginComponent;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    authenticationService = {
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      getLoggedInUser: jest.fn(),
    } as any;

    component = new NavibarLoginComponent(authenticationService);
  });

  it('should log in successfully', () => {
    const loggedInUser = 'John';
    jest.spyOn(authenticationService, 'login').mockReturnValue(of(true));
    jest
      .spyOn(authenticationService, 'getLoggedInUser')
      .mockReturnValue(loggedInUser);

    component.email = 'john@example.com';
    component.password = 'password';
    component.login();

    expect(authenticationService.login).toHaveBeenCalledWith(
      'john@example.com',
      'password'
    );
    expect(authenticationService.getLoggedInUser).toHaveBeenCalled();
    expect(component.loggedInUser).toBe(loggedInUser);
    expect(component.showMessage).toBe(true);
  });

  it('should log out successfully', () => {
    component.logout();

    expect(authenticationService.logout).toHaveBeenCalled();
    expect(component.loggedInUser).toBe('');
  });

  it('should validate sign-in form', () => {
    component.signInData.name = 'John';
    component.signInData.email = 'john@example.com';
    component.signInData.password = 'password';
    component.confirmPassword = 'password';

    const isValid = component.isSignInFormValid();

    expect(isValid).toBe(true);
  });

  it('should not validate sign-in form if passwords do not match', () => {
    component.signInData.password = 'password';
    component.confirmPassword = 'incorrectpassword';

    const isValid = component.isSignInFormValid();

    expect(isValid).toBe(false);
  });

  it('should handle sign-in', () => {
    const mockResponse = { id: 'abc123' };
    jest
      .spyOn(authenticationService, 'signup')
      .mockReturnValue(of(mockResponse));

    component.signInData = {
      id: '123',
      name: 'John',
      email: 'john@example.com',
      password: 'password',
    };
    component.confirmPassword = 'password';
    component.signIn();

    expect(authenticationService.signup).toHaveBeenCalledWith(
      component.signInData
    );
    expect(component.showSignInForm).toBe(false);
    expect(component.isRegistered).toBe(true);
  });

  it('should handle sign-in failure', () => {
    const errorMessage = 'Invalid credentials';
    const consoleErrorSpy = jest.spyOn(console, 'error');

    jest
      .spyOn(authenticationService, 'signup')
      .mockReturnValue(throwError(errorMessage));

    component.signIn();

    expect(authenticationService.signup).toHaveBeenCalledWith(
      component.signInData
    );
    expect(component.showSignInForm).toBe(false);
    expect(component.isRegistered).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Sign-in failed:',
      errorMessage
    );

    consoleErrorSpy.mockRestore();
  });
});
