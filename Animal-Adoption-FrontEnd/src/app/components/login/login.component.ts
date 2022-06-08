import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide: boolean;
  constructor(
    public accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.hide = true;
  }

  public get forgotPasswordLink(): string {
    const lang = window.location.pathname.split('/')[1];
    return `/${lang}/forgot-password`;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  public login(): void {
    if (window.navigator.onLine) {
      this.accountService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigateByUrl(`/main-page`);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  registerBasicUser(): void {
    this.router.navigateByUrl('basic-registration');
  }

  registerNGO(): void {
    this.router.navigateByUrl('ngo-registration');
  }
}
