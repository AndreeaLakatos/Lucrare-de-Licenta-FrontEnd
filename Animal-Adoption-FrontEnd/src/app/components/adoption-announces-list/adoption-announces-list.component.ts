import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { OfflineService } from 'src/app/services/offline/offline.service';
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
    $localize`:@@cat: Cat`,
    $localize`:@@dog: Dog`,
    $localize`:@@rabbit: Rabbit`,
  ];

  public sizeTranslations = [
    $localize`:@@extraSmall: Extra small`,
    $localize`:@@small: Small`,
    $localize`:@@medium: Medium`,
    $localize`:@@large: Large`,
    $localize`:@@extraLarge: Extra large`,
  ];
  
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    public adoptionAnnouncementDialog: MatDialog,
    public snackbarService: SnackbarService,
    private offlineService: OfflineService
  ) {}

  ngOnInit(): void {
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
      (res) => {
        this.adoptionAnnouncements = res;
        if (window.navigator.onLine)
          this.offlineService.updateAdoptionAnnouncements(this.adoptionAnnouncements);
      },
      (err) => console.log(err)
    )
  }

  public refreshPage(adoptionAnnouncement: AdoptionAnnouncementListModel){
    this.adoptionAnnouncements = this.adoptionAnnouncements.filter(x => x.id !== adoptionAnnouncement.id);
    this.snackbarService.success($localize`:@@deletionSucceded: Successfull deletion!`);
  }
}
