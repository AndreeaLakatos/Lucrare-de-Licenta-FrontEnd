import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/enums/city';
import { County } from 'src/app/models/enums/county';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public cities?: KeyValue<number, string>[];
  public counties?: KeyValue<number, string>[];
  constructor(public accountService: AccountService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getCitiesCounties();
  }

  initForm(): void{
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  register(): void {
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl(`/login`);
    },
    (error) => {
      console.log(error);
    });
  }

  private getCitiesCounties() {
    this.cities = [
      { key:1, value: 'Cluj-Napoca'},
      { key:2, value: 'Turda' },
      { key:3, value: 'Dej' },
      { key:4, value: 'Câmpia Turzii' },
      { key:5, value: 'Gherla' },
      { key:6, value: 'Huedin' },
    ]

    this.counties = [
      { key:1, value: 'Cluj'}
    ]
  }
}
