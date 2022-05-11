import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { AccountService } from 'src/app/services/account/account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { NgoDetailsModel } from './models/ngo-details.model';

@Component({
  selector: 'app-ngo-details',
  templateUrl: './ngo-details.component.html',
  styleUrls: ['./ngo-details.component.scss'],
})
export class NgoDetailsComponent implements OnInit {
  public ngoDetailsForm!: FormGroup;
  public cities?: City[];
  public counties?: County[];
  public isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private utilsService: UtilsService,
    public dialogRef: MatDialogRef<NgoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NgoDetailsModel
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCounties(this.data.ngoCounty.name);
  }

  public save(): void {
    this.accountService
      .saveNgoDetails(this.ngoDetailsForm.value)
      .subscribe(() => {
        this.ngoDetailsForm.disable();
        this.isEditing = false;
      });
  }

  public getCities(county: County) {
    this.utilsService.getCities(county.id).subscribe((cities) => {
      this.cities = cities;
      const cityDefault = this.cities.find(
        (c) => c.name === this.data.ngoCity.name
      );
      this.ngoDetailsForm.get('ngoCity')!.setValue(cityDefault);
    });
  }

  public edit() {
    this.isEditing = true;
    this.ngoDetailsForm.enable();
  }

  public cancel() {
    if (this.data) {
      this.getCounties(this.data.ngoCounty.name);
      this.ngoDetailsForm.get('ngoName')!.setValue(this.data.ngoName);
      this.ngoDetailsForm.get('code')!.setValue(this.data.code);
    }
    this.ngoDetailsForm.disable();
    this.isEditing = false;
  }

  private initForm(): void {
    this.ngoDetailsForm = this.formBuilder.group({
      ngoName: [this.data.ngoName, Validators.required],
      code: [this.data.code, Validators.required],
      ngoCounty: ['', Validators.required],
      ngoCity: ['', Validators.required],
      ngoStreet: [this.data.ngoStreet, Validators.required],
    });
    this.ngoDetailsForm.disable();
  }

  private getCounties(county: string) {
    this.utilsService.getCounties().subscribe((counties) => {
      this.counties = counties;
      const countyDefault = this.counties.find((c) => c.name === county)!;
      this.ngoDetailsForm.get('ngoCounty')!.setValue(countyDefault);
      this.getCities(countyDefault);
    });
  }
}
