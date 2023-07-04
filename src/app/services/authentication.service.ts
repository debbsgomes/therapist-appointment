import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: boolean = false;
  loggedInUser: string = '';

  private usersURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.usersURL).pipe(
      map(data => data.map(this.mapToUser))
    );
  }

  private mapToUser(data: any): User {
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      cellphoneNumber: data.cellphoneNumber,
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
          return true;
        }
        return false;
      })
    );
  }

    logout(): void {
      this.isLoggedIn = false;
      this.loggedInUser = '';
    }

    getLoggedInUser(): string {
      return this.isLoggedIn ? this.loggedInUser : '';
    }
}
