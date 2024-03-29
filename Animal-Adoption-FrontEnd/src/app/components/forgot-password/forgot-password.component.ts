import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;
  public hide: boolean = true;
  public successfullySent: boolean = false;
  public unsuccessfullySent: boolean = false;
  constructor(
    public accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const lang = window.location.pathname.split('/')[1];
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clientURI: `http://localhost:4200/${lang}/reset-password`,
    });
  }

  public forgotPassword(): void {
    if (window.navigator.onLine) {
      this.accountService.forgotPassword(this.forgotPasswordForm.value).subscribe(
        (_) => {
          const message = $localize`:@@verifyEmail: Email successfully sent! Please verify your email.`;
          this.snackbarService.success(message);
          this.successfullySent = true;
        },
        (err) => {
          console.log(err.message);
          this.unsuccessfullySent = true;
        }
      );
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public recover(): void {}

  public backToLogin() {
    this.router.navigateByUrl('login');
  }
}
