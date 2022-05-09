import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AnimalSize } from '../user-preferences/models/animal-size.enum';
import { AnimalType } from '../user-preferences/models/animal-type.enum';
import { AdoptionComponent } from './adoption/adoption.component';
import { AdoptionAnnouncementListModel } from './models/adoption-announcement-list.model';
import { AdoptionAnnouncementModel } from './models/adoption-announcement.model';

@Component({
  selector: 'app-adoption-announces-list',
  templateUrl: './adoption-announces-list.component.html',
  styleUrls: ['./adoption-announces-list.component.scss'],
})
export class AdoptionAnnouncesListComponent implements OnInit {
  public adoptionAnnouncements: AdoptionAnnouncementListModel[] = [];

  sizesControl = new FormControl([]);
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
    public accountService: AccountService,
    public ngoService: NgoService,
    public translate: TranslateService,
    public adoptionAnnouncementDialog: MatDialog,
    public snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    console.log(this.translate.instant('extraSmall'));
    this.getAdoptionAnnounces();
  }

  public addAnnouncement() {
    this.editAnnouncement(undefined);
  }

  public editAnnouncement(adoptionAnnouncement: AdoptionAnnouncementModel | undefined) {
    const dialogRef = this.adoptionAnnouncementDialog.open(AdoptionComponent, {
      width: '600px',
      data: adoptionAnnouncement,
    });
    dialogRef.afterClosed().subscribe((_) => this.getAdoptionAnnounces());
  }

  public getAdoptionAnnounces() {
    this.ngoService.getAdoptionAnnouncements().subscribe(
      (res) => this.adoptionAnnouncements = res
    )
  }

  public refreshPage(adoptionAnnouncement: AdoptionAnnouncementListModel){
    this.adoptionAnnouncements = this.adoptionAnnouncements.filter(x => x.id !== adoptionAnnouncement.id);
    this.snackbarService.success(this.translate.instant('deletionSucceded'))
  }
}
