import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForgotPasswordModel } from 'src/app/components/forgot-password/models/forgot-password.model';
import { ResetPasswordModel } from 'src/app/components/reset-password/models/reset-password.model';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { LoginUser } from 'src/app/models/authentication/login-user';
import { RegisterNgo } from 'src/app/models/authentication/register-ngo';
import { RegisterUser } from 'src/app/models/authentication/register-user';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}account/`;
  private currentUserSubject = new ReplaySubject<User>(1);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public login(loginUser: LoginUser) {
    return this.httpClient.post<User>(`${this.apiUrl}login`, loginUser).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
        }
      })
    );
  }

  public register(registerUser: RegisterUser) {
    return this.httpClient.post<User>(`${this.apiUrl}register`, registerUser);
  }

  public registerNgo(registerUser: RegisterNgo) {
    return this.httpClient.post<User>(
      `${this.apiUrl}register-ngo`,
      registerUser
    );
  }

  public logout() {
    this.currentUserSubject.next(undefined);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('username');    
    localStorage.removeItem('role');    
  }

  public forgotPassword(forgotPasswordModel: ForgotPasswordModel) {
    return this.httpClient.post(
      `${this.apiUrl}forgot-password`,
      forgotPasswordModel
    );
  }

  public resetPassword(resetPasswordModel: ResetPasswordModel) {
    return this.httpClient.post(
      `${this.apiUrl}reset-password`,
      resetPasswordModel
    );
  }

  public isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  public getUserUsername(): string {
    return localStorage.getItem('username')!;
  }

  private setCurrentUser(user: User): void {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    if (Array.isArray(roles)) {
      user.roles = roles;
    } else {
      user.roles.push(roles);
    }
    localStorage.setItem('role', user.roles[0]);
    this.currentUserSubject.next(user);
  }

  private getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
