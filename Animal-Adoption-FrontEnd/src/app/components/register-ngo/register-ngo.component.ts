import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterNgo } from 'src/app/models/authentication/register-ngo';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-register-ngo',
  templateUrl: './register-ngo.component.html',
  styleUrls: ['./register-ngo.component.scss'],
})
export class RegisterNgoComponent implements OnInit {
  public registerForm!: FormGroup;
  public citiesNgo?: City[];
  public cities?: City[];
  public counties?: County[];
  public hide: boolean = true;
  public successfullyRegister: boolean = false;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCounties();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
      ngoName: ['', Validators.required],
      code: ['', Validators.required],
      foundedDate: ['', Validators.required],
      ngoStreet: ['', Validators.required],
      ngoCity: ['', Validators.required],
      ngoCounty: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  public register(): void {
    this.accountService.registerNgo(this.registerForm.value).subscribe(
      () => {
        const message = $localize`:@@successfullyRegister: Registration succeded!`;
        this.snackbarService.success(message);
        this.successfullyRegister = true;
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

  public getCitiesNgo() {
    var county = this.registerForm.get('county')?.value.id;
    this.utilsService.getCities(county).subscribe((cities) => {
      this.citiesNgo = cities;
    });
  }

  public getCities() {
    var county = this.registerForm.get('county')?.value.id;
    this.utilsService.getCities(county).subscribe((cities) => {
      this.cities = cities;
    });
  }
}
