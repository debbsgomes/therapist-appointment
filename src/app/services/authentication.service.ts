import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: boolean = false;
  loggedInUser: string = '';

  private usersURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router)  {
    this.checkLoggedInStatus();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.usersURL).pipe(
      map(data => data.map(this.mapToUser))
    );
  }

  private mapToUser(data: any): User {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password
    };
  }

  signup(user: User): Observable<any> {
    return this.http.post(this.usersURL, user);
  }
    

  login(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          this.isLoggedIn = true;
          this.loggedInUser = user.name;
          this.saveLoggedInStatus();
          return true;
        }
        return false;
      })
    );
  }

    logout(): void {
      this.isLoggedIn = false;
      this.loggedInUser = '';
      this.removeLoggedInStatus();
      this.router.navigate(['/']);
    }

    private checkLoggedInStatus(): void {
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInStatus && loggedInUser) {
        this.isLoggedIn = JSON.parse(loggedInStatus);
        this.loggedInUser = JSON.parse(loggedInUser);
      }
    }

    private saveLoggedInStatus(): void {
      localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    }
  
    private removeLoggedInStatus(): void {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loggedInUser');
    }
  

    getLoggedInUser(): string {
      return this.isLoggedIn ? this.loggedInUser : '';
    }
}
