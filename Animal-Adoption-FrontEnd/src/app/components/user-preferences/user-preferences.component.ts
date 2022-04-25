import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { AnimalSize } from './models/animal-size.enum';
import { AnimalType } from './models/animal-type.enum';
import { UserPreferencesModel } from './models/user-preferences.model';

@Component({
  selector: 'app-user-preferences-component',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss'],
})
export class UserPreferencesComponent implements OnInit {
  public animals = [AnimalType.CAT, AnimalType.DOG, AnimalType.RABBIT];
  public sizes = [
    AnimalSize.EXTRA_SMALL,
    AnimalSize.SMALL,
    AnimalSize.MEDIUM,
    AnimalSize.LARGE,
    AnimalSize.EXTRA_LARGE,
  ];

  public isEditing: boolean = false;

  public animalTranslations = [
    this.translate.instant('cat'),
    this.translate.instant('dog'),
    this.translate.instant('rabbit'),
  ];

  public sizeTranslations = [
    this.translate.instant('extraSmall'),
    this.translate.instant('small'),
    this.translate.instant('medium'),
    this.translate.instant('large'),
    this.translate.instant('extraLarge'),
  ];

  public userPreferencesForm!: FormGroup;
  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    public dialogRef: MatDialogRef<UserPreferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserPreferencesModel
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public save(): void {
    this.accountService
      .saveUserPreferences(this.userPreferencesForm.value)
      .subscribe(() => {
        this.userPreferencesForm.disable();
        this.isEditing = false;
      });
  }

  public edit() {
    this.isEditing = true;
    this.userPreferencesForm.enable();
  }

  public cancel() {
    if (this.data) {
      this.userPreferencesForm.get('hasFamily')!.setValue(this.data.hasFamily);
      this.userPreferencesForm
        .get('haveChildren')!
        .setValue(this.data.haveChildren);
      this.userPreferencesForm
        .get('livingPlace')!
        .setValue(this.data.livingPlace);
      this.userPreferencesForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.userPreferencesForm
        .get('animalType')!
        .setValue(this.data.animalType);
    }

    this.userPreferencesForm.disable();
    this.isEditing = false;
  }

  private initForm(): void {
    this.userPreferencesForm = this.formBuilder.group({
      hasFamily: ['', Validators.required],
      haveChildren: ['', Validators.required],
      livingPlace: ['', Validators.required],
      animalSize: ['', Validators.required],
      animalType: ['', Validators.required],
    });

    if (this.data) {
      this.userPreferencesForm.get('hasFamily')!.setValue(this.data.hasFamily);
      this.userPreferencesForm
        .get('haveChildren')!
        .setValue(this.data.haveChildren);
      this.userPreferencesForm
        .get('livingPlace')!
        .setValue(this.data.livingPlace);
      this.userPreferencesForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.userPreferencesForm
        .get('animalType')!
        .setValue(this.data.animalType);
    }

    this.userPreferencesForm.disable();
  }
}
