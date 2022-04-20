import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { AccountService } from 'src/app/services/account/account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public cities?: City[];
  public counties?: County[];
  public hide: boolean = true;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCounties();
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  register(): void {
    this.accountService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigateByUrl(`/login`);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public backToLogin() {
    this.router.navigateByUrl(`/login`);
  }

  private getCounties() {
    this.utilsService.getCounties().subscribe((counties) => {
      this.counties = counties;
    });
  }

  public getCities() {
    var county = this.registerForm.get("county")?.value.id;
    this.utilsService.getCities(county).subscribe((cities) => {
      this.cities = cities;
    });
  }
}
