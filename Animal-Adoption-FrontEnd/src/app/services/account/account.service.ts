import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForgotPasswordModel } from 'src/app/components/forgot-password/models/forgot-password.model';
import { NgoDetailsModel } from 'src/app/components/ngo-details/models/ngo-details.model';
import { ResetPasswordModel } from 'src/app/components/reset-password/models/reset-password.model';
import { UserDetailsModel } from 'src/app/components/user-details/models/user-details.model';
import { UserPreferencesModel } from 'src/app/components/user-preferences/models/user-preferences.model';
import { LoginUser } from 'src/app/models/authentication/login-user';
import { RegisterNgo } from 'src/app/models/authentication/register-ngo';
import { RegisterUser } from 'src/app/models/authentication/register-user';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}account/`;
  private currentUserSubject = new ReplaySubject<User | undefined>(1);
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
          console.log(user.token);
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

  public get isBasicUser(): boolean {
    return this.getUserRole() === 'BasicUser';
  }

  public get isNgo(): boolean {
    return this.getUserRole() === 'Ngo';
  }

  public getUserRole(): string {
    return localStorage.getItem('role')!;
  }

  public getUserDetails(): Observable<UserDetailsModel> {
    return this.httpClient.get<UserDetailsModel>(`${this.apiUrl}user-details/${this.getUserUsername()}`);
  }

  public getUserPreferences(): Observable<UserPreferencesModel> {
    return this.httpClient.get<UserPreferencesModel>(`${this.apiUrl}user-preferences/${this.getUserUsername()}`);
  }

  public getNgoDetails(): Observable<NgoDetailsModel> {
    return this.httpClient.get<NgoDetailsModel>(`${this.apiUrl}ngo-details/${this.getUserUsername()}`);
  }

  public saveUserDetails(userDetails: UserDetailsModel): Observable<UserDetailsModel> {
    return this.httpClient.post<UserDetailsModel>(`${this.apiUrl}user-details`, userDetails);
  }

  public saveUserPreferences(userPreferences: UserPreferencesModel): Observable<UserPreferencesModel> {
    return this.httpClient.post<UserPreferencesModel>(`${this.apiUrl}user-preferences/${this.getUserUsername()}`, userPreferences);
  }

  public saveNgoDetails(ngoDetails: NgoDetailsModel): Observable<NgoDetailsModel> {
    return this.httpClient.post<NgoDetailsModel>(`${this.apiUrl}ngo-details/${this.getUserUsername()}`, ngoDetails);
  }

  private setCurrentUser(user: User): void {
    user.roles = [];
    const token = this.getDecodedAccessToken(user.token);
    const role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    user.roles.push(role);

    localStorage.setItem('role', role);
    this.currentUserSubject.next(user);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
