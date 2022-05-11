import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { AccountService } from 'src/app/services/account/account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UserDetailsModel } from './models/user-details.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public userDetailsForm!: FormGroup;
  public cities?: City[];
  public counties?: County[];
  public isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private utilsService: UtilsService,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailsModel
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCounties(this.data.county.name);
  }

  public save(): void {
    this.accountService
      .saveUserDetails(this.userDetailsForm.value)
      .subscribe(() => {
        this.userDetailsForm.disable();
        this.isEditing = false;
      });
  }

  public getCities(county: County) {
    this.utilsService.getCities(county.id).subscribe((cities) => {
      this.cities = cities;
      const cityDefault = this.cities.find(
        (c) => c.name === this.data.city.name
      )!;
      this.userDetailsForm.get('city')!.setValue(cityDefault);
    });
  }

  public edit() {
    this.isEditing = true;
    this.userDetailsForm.enable();
  }

  public cancel() {
    this.getCounties(this.data.county.name);
    if (this.data) {
      this.userDetailsForm.get('firstName')!.setValue(this.data.firstName);
      this.userDetailsForm.get('lastName')!.setValue(this.data.lastName);
      this.userDetailsForm.get('userName')!.setValue(this.data.userName);
      this.userDetailsForm.get('email')!.setValue(this.data.email);
      this.userDetailsForm.get('phoneNumber')!.setValue(this.data.phoneNumber);
      this.userDetailsForm.get('county')!.setValue(this.data.county);
    }
    this.userDetailsForm.disable();
    this.isEditing = false;
  }

  private initForm(): void {
    this.userDetailsForm = this.formBuilder.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      userName: [this.data.userName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      phoneNumber: [this.data.phoneNumber, Validators.required],
      street: [this.data.street, Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
    });
    this.userDetailsForm.disable();
  }

  private getCounties(county: string) {
    this.utilsService.getCounties().subscribe((counties) => {
      this.counties = counties;
      const countyDefault = this.counties.find(
        (c) => c.name === county
      )!;
      this.userDetailsForm.get('county')!.setValue(countyDefault);
      this.getCities(countyDefault);
    });
  }
}
