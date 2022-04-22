import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clientURI: 'http://localhost:4200/reset-password',
    });
  }

  public forgotPassword(): void {
    this.accountService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (_) => {
        const message = this.translate.instant('verifyEmail');
        this.snackbarService.success(message);
        this.successfullySent = true;
      },
      (err) => {
        console.log(err.message);
        this.unsuccessfullySent = true;
      }
    );
  }

  public recover(): void {}

  public backToLogin() {
    this.router.navigateByUrl(`/login`);
  }
}
