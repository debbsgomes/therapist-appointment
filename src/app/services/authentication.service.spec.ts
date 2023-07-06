import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let http: HttpClient;
  let router: any;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
    } as any;

    router = {
      navigate: jest.fn(),
    };

    authService = new AuthenticationService(http, router);
  });
  it('should retrieve users successfully', () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com', password: 'password1' },
      { id: 2, name: 'Jane', email: 'jane@example.com', password: 'password2' },
    ];
    const getUsersSpy = jest.spyOn(http, 'get').mockReturnValue(of(mockUsers));

    authService.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    expect(getUsersSpy).toHaveBeenCalledWith('http://localhost:3000/users');
  });

  it('should login successfully with valid credentials', () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com', password: 'password1' },
      { id: 2, name: 'Jane', email: 'jane@example.com', password: 'password2' },
    ];
    jest.spyOn(http, 'get').mockReturnValue(of(mockUsers));

    authService.login('john@example.com', 'password1').subscribe((loggedIn) => {
      expect(loggedIn).toBe(true);
      expect(authService.isLoggedIn).toBe(true);
      expect(authService.loggedInUser).toBe('John');
      expect(localStorage.getItem('isLoggedIn')).toBe('true');
      expect(localStorage.getItem('loggedInUser')).toBe('"John"');
    });
  });

  it('should not login with invalid credentials', () => {
    const mockUsers = [
      {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      },
      {
        id: '2',
        name: 'Jane',
        email: 'jane@example.com',
        password: 'password',
      },
    ];
    jest.spyOn(http, 'get').mockReturnValue(of(mockUsers));

    authService
      .login('john@example.com', 'incorrectpassword')
      .subscribe((loggedIn) => {
        expect(loggedIn).toBe(true);
        expect(authService.isLoggedIn).toBe(false);
        expect(authService.loggedInUser).toBe('');
        expect(localStorage.getItem('isLoggedIn')).toBeNull();
        expect(localStorage.getItem('loggedInUser')).toBeNull();
      });
  });

  it('should logout successfully', () => {
    authService.isLoggedIn = true;
    authService.loggedInUser = 'John';

    authService.logout();

    expect(authService.isLoggedIn).toBe(false);
    expect(authService.loggedInUser).toBe('');
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(localStorage.getItem('loggedInUser')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should get the logged-in user', () => {
    authService.isLoggedIn = true;
    authService.loggedInUser = 'John';

    const loggedInUser = authService.getLoggedInUser();

    expect(loggedInUser).toBe('John');
  });
});
