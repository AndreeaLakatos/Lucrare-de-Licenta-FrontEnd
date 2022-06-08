import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AdoptionRequestListModel } from '../../adoption-requests-list/models/adoption-request-list-model.model';
import { AdoptionUserRequestComponent } from '../../adoption-user-request/adoption-user-request.component';
import { AddAdoptionRequestComponent } from '../add-adoption-request/add-adoption-request.component';
import { AddAdoptionRequestModel } from '../add-adoption-request/models/add-adoption-request.model';
import {
  AdoptionAnnouncementListModel,
  AnimalTranslations,
  SizeTranslations,
} from '../models/adoption-announcement-list.model';

@Component({
  selector: 'app-adoption-announcement-list-model',
  templateUrl: './adoption-announcement-list-model.component.html',
  styleUrls: ['./adoption-announcement-list-model.component.scss'],
})
export class AdoptionAnnouncementListModelComponent implements OnInit {
  @Input()
  adoptionAnnouncementModel!: AdoptionAnnouncementListModel;
  @Output() delete: EventEmitter<AdoptionAnnouncementListModel> =
    new EventEmitter<AdoptionAnnouncementListModel>();
  @Output() add = new EventEmitter();

  public adoptionRequests: AdoptionRequestListModel[] = [];
  public animalTranslations = AnimalTranslations;
  public sizeTranslations = SizeTranslations;
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    public config: NgbCarouselConfig,
    public adoptionRequestDialog: MatDialog,
    public myRequestDialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.animation = false;
    config.interval = 100000000000000000;
  }

  ngOnInit(): void {}

  public addAdoptionRequest() {
    if (window.navigator.onLine) {
      const adoptionRequest = new AddAdoptionRequestModel(
        0,
        this.adoptionAnnouncementModel.id,
        '',
        new Date(),
        '',
        ''
      );
      const dialogRef = this.adoptionRequestDialog.open(AddAdoptionRequestComponent, {
        height: '400px',
        width: '400px',
        data: adoptionRequest,
      });
      dialogRef.afterClosed().subscribe((_) => this.add.emit());
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public deleteAnnouncement() {
    if (window.navigator.onLine) {
      this.ngoService
        .deleteAdoptionAnnouncement(this.adoptionAnnouncementModel.id)
        .subscribe();
      this.delete.emit(this.adoptionAnnouncementModel);
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public showAllRequests() {
    this.router.navigateByUrl(
      `/adoption-requests/${this.adoptionAnnouncementModel.id}`
    );
  }

  public showMyRequest() {
    if (window.navigator.onLine) {
      this.myRequestDialog.open(AdoptionUserRequestComponent, {
        data: { announcementId: this.adoptionAnnouncementModel.id },
      });
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
    
  }

  public get isActive(): string {
    return !this.adoptionAnnouncementModel.status
      ? $localize`:@@active: Active`
      : $localize`:@@inactive: Inactive`;
  }
}
