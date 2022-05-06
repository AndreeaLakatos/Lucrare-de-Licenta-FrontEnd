import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AnimalSize } from '../../user-preferences/models/animal-size.enum';
import { AnimalType } from '../../user-preferences/models/animal-type.enum';
import { FosteringAnnouncementModel } from '../models/fostering-announcement.model';

@Component({
  selector: 'app-fostering',
  templateUrl: './fostering.component.html',
  styleUrls: ['./fostering.component.scss'],
})
export class FosteringComponent implements OnInit {
  public fosteringAnnouncementForm!: FormGroup;
  public isEditing: boolean = false;
  public selectedFiles?: FileList;
  public selectedFileNames: string[] = [];
  punprogressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  public fosteringAnnouncement?: FosteringAnnouncementModel;

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
    public dialogRef: MatDialogRef<FosteringComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FosteringAnnouncementModel
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public edit() {
    this.isEditing = true;
    this.fosteringAnnouncementForm.enable();
  }

  public save() {
    const data = new FosteringAnnouncementModel(
      0,
      this.fosteringAnnouncementForm.get('title')!.value,
      this.fosteringAnnouncementForm.get('description')!.value,
      this.fosteringAnnouncementForm.get('animalType')!.value,
      this.fosteringAnnouncementForm.get('animalSize')!.value,
      this.fosteringAnnouncementForm.get('startDate')!.value,
      this.fosteringAnnouncementForm.get('endDate')!.value,
      this.fosteringAnnouncementForm.get('moreDetails')!.value
    );

    this.ngoService.addFosteringAnnouncement(data).subscribe((res) => {
      this.fosteringAnnouncement = res;
      this.uploadFiles(this.fosteringAnnouncement.id);
      this.fosteringAnnouncementForm.disable();
      this.isEditing = false;
    });
  }

  public cancel() {
    if (this.data) {
      this.fosteringAnnouncementForm.get('title')!.setValue(this.data.title);
      this.fosteringAnnouncementForm
        .get('description')!
        .setValue(this.data.description);
      this.fosteringAnnouncementForm
        .get('animalType')!
        .setValue(this.data.animalType);
      this.fosteringAnnouncementForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.fosteringAnnouncementForm
        .get('moreDetails')!
        .setValue(this.data.moreDetails);
      this.fosteringAnnouncementForm
        .get('startDate')!
        .setValue(this.data.startDate);
      this.fosteringAnnouncementForm
        .get('endDate')!
        .setValue(this.data.endDate);
      this.fosteringAnnouncementForm.disable();
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
      this.ngoService.uploadFosteringImage(id, file).subscribe();
    }
  }

  private initForm(): void {
    this.fosteringAnnouncementForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      animalType: ['', Validators.required],
      animalSize: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      moreDetails: [''],
    });
    if (this.data) {
      this.fosteringAnnouncementForm.get('title')!.setValue(this.data.title);
      this.fosteringAnnouncementForm
        .get('description')!
        .setValue(this.data.description);
      this.fosteringAnnouncementForm
        .get('animalType')!
        .setValue(this.data.animalType);
      this.fosteringAnnouncementForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.fosteringAnnouncementForm
        .get('startDate')!
        .setValue(this.data.startDate);
      this.fosteringAnnouncementForm
        .get('endDate')!
        .setValue(this.data.endDate);
      this.fosteringAnnouncementForm
        .get('moreDetails')!
        .setValue(this.data.moreDetails);
      this.fosteringAnnouncementForm
        .get('animalType')!
        .setValue(this.data.animalType);
      this.fosteringAnnouncementForm
        .get('animalSize')!
        .setValue(this.data.animalSize);
      this.fosteringAnnouncementForm.disable();
    } else this.isEditing = true;
  }
}
