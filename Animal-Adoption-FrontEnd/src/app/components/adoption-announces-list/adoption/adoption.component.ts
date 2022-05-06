import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AnimalSize } from '../../user-preferences/models/animal-size.enum';
import { AnimalType } from '../../user-preferences/models/animal-type.enum';
import { AdoptionAnnouncementModel } from '../models/adoption-announcement.model';

@Component({
  selector: 'app-adoption-component',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss'],
})
export class AdoptionComponent implements OnInit {
  public adoptionAnnouncementForm!: FormGroup;
  public cities?: City[];
  public counties?: County[];
  public isEditing: boolean = false;
  public selectedFiles?: FileList;
  public selectedFileNames: string[] = [];
  punprogressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  public adoptionAnnouncement?: AdoptionAnnouncementModel;

  public animals = [AnimalType.CAT, AnimalType.DOG, AnimalType.RABBIT];
  public sizes = [
    AnimalSize.EXTRA_SMALL,
    AnimalSize.SMALL,
    AnimalSize.MEDIUM,
    AnimalSize.LARGE,
    AnimalSize.EXTRA_LARGE,
  ];

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

  constructor(
    public accounService: AccountService,
    private formBuilder: FormBuilder,
    public ngoService: NgoService,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<AdoptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdoptionAnnouncementModel
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public edit() {
    this.isEditing = true;
    this.adoptionAnnouncementForm.enable();
  }

  public save() {
    const data = new AdoptionAnnouncementModel(
      0,
      this.adoptionAnnouncementForm.get('title')!.value,
      this.adoptionAnnouncementForm.get('description')!.value,
      this.adoptionAnnouncementForm.get('animalType')!.value,
      this.adoptionAnnouncementForm.get('animalSize')!.value,
      this.adoptionAnnouncementForm.get('moreDetails')!.value,
    );

    this.ngoService.addAdoptionAnnouncement(data).subscribe((res) => {
      this.adoptionAnnouncement = res;
      this.uploadFiles(this.adoptionAnnouncement.id);
      this.adoptionAnnouncementForm.disable();
      this.isEditing = false;
    });
  }

  public cancel() {
    if (this.data) {
      this.adoptionAnnouncementForm.get('title')!.setValue(this.data.title);
      this.adoptionAnnouncementForm
        .get('description')!
        .setValue(this.data.description);
      this.adoptionAnnouncementForm
        .get('animalType')!
        .setValue(this.data.animalType);
      this.adoptionAnnouncementForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.adoptionAnnouncementForm
        .get('moreDetails')!
        .setValue(this.data.moreDetails);
      this.adoptionAnnouncementForm
        .get('animalType')!
        .setValue(this.data.animalType);
      this.adoptionAnnouncementForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.adoptionAnnouncementForm.disable();
      this.isEditing = false;
    } else {
      this.dialogRef.close();
    }
  }

  public selectFiles(event: any): void {
    this.message = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  private uploadFiles(id: number): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(id, this.selectedFiles[i]);
      }
    }
  }

  private upload(id: number, file: File): void {
    if (file) {
      this.ngoService.uploadAdoptionImage(id, file).subscribe();
    }
  }

  private initForm(): void {
    this.adoptionAnnouncementForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      county: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      animalType: ['', Validators.required],
      animalSize: ['', Validators.required],
      moreDetails: [''],
    });
    if (this.data) {
      this.adoptionAnnouncementForm.get('title')!.setValue(this.data.title);
      this.adoptionAnnouncementForm
        .get('description')!
        .setValue(this.data.description);
      this.adoptionAnnouncementForm
        .get('animalType')!
        .setValue(this.data.animalType);
      this.adoptionAnnouncementForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.adoptionAnnouncementForm
        .get('moreDetails')!
        .setValue(this.data.moreDetails);
      this.adoptionAnnouncementForm
        .get('animalType')!
        .setValue(this.data.animalType);
      this.adoptionAnnouncementForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.adoptionAnnouncementForm.disable();
    } else this.isEditing = true;
  }
}
