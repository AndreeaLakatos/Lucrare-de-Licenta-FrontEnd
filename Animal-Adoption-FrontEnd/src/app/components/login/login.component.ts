import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(public accountService: AccountService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  login(): void {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl(`/`);
    },
    (error) => {
      console.log(error);
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

}
