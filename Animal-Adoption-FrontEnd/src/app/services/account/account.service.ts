import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from 'src/app/models/authentication/login-user';
import { RegisterUser } from 'src/app/models/authentication/register-user';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.apiUrl}account`;
  private currentUserSubject = new ReplaySubject<User>(1);
  private currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(loginUser: LoginUser) {
    return this.httpClient.post<User>(`${this.apiUrl}login`, loginUser).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register (registerUser: RegisterUser) {
    return this.httpClient.post<User>(`${this.apiUrl}register`, registerUser);
  }

  private setCurrentUser(user: User): void {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    if (Array.isArray(roles)) {
      user.roles = roles;
    } else {
      user.roles.push(roles);
    }
    this.currentUserSubject.next(user);
  }

  getDecodedToken (token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  logout () {
    this.currentUserSubject.next(undefined);
  }
}
