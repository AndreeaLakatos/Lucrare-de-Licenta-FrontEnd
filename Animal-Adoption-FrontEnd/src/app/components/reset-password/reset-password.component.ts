import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public changePasswordForm!: FormGroup;
  public hide: boolean = true;
  public successfullyChanged: boolean = false;
  public unsuccessfullyChanged: boolean = false;
  private _token!: string;
  private _email!: string;
  constructor(
    public accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._token = this.route.snapshot.queryParams['token'];
    this._email = this.route.snapshot.queryParams['email'];
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(10)]],
      email: this._email,
      token: this._token
    });
  }

  public changePassword(): void {
    this.accountService.resetPassword(this.changePasswordForm.value).subscribe(
      (_) => {
        const message = $localize`:@@passwordSuccessfullyChanged: Password successfully changed!`;
        this.snackbarService.success(message);
        this.successfullyChanged = true;
        this.unsuccessfullyChanged = false;
      },
      (_) => {
        this.unsuccessfullyChanged = true;
        this.successfullyChanged = false;
      }
    );
  }

  public backToLogin() {
    this.router.navigateByUrl('login');
  }

}
