import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserModel } from '../../adoption-user-request/models/user-model';
import { FosteringUserRequestComponent } from '../../fostering-user-request/fostering-user-request.component';
import { AddFosteringRequestComponent } from '../add-fostering-request/add-fostering-request.component';
import { AddFosteringRequestModel } from '../add-fostering-request/models/add-fostering-request.model';
import {
  AnimalTranslations,
  FosteringAnnouncementListModel,
  SizeTranslations,
} from '../models/fostering-announcement-list.model';

@Component({
  selector: 'app-fostering-announcement-list-model',
  templateUrl: './fostering-announcement-list-model.component.html',
  styleUrls: ['./fostering-announcement-list-model.component.scss'],
})
export class FosteringAnnouncementListModelComponent implements OnInit {
  @Input()
  fosteringAnnouncementModel!: FosteringAnnouncementListModel;
  @Output() delete: EventEmitter<FosteringAnnouncementListModel> =
    new EventEmitter<FosteringAnnouncementListModel>();
  @Output() add = new EventEmitter();
  public animalTranslations = AnimalTranslations;
  public sizeTranslations = SizeTranslations;
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    public config: NgbCarouselConfig,
    public addressCoordinatessDialog: MatDialog,
    public fosteringRequestDialog: MatDialog,
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

  public addFosteringRequest() {
    if (window.navigator.onLine) {
      const fosteringRequest = new AddFosteringRequestModel(
        0,
        this.fosteringAnnouncementModel.id,
        '',
        new Date(),
        '',
        ''
      );
      const dialogRef = this.fosteringRequestDialog.open(AddFosteringRequestComponent, {
        height: '500px',
        width: '400px',
        data: fosteringRequest,
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
      .deleteFosteringAnnouncement(this.fosteringAnnouncementModel.id)
      .subscribe((_) => this.delete.emit(this.fosteringAnnouncementModel));
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
    
  }

  public showAllRequests() {
    this.router.navigateByUrl(
      `/fostering-requests/${this.fosteringAnnouncementModel.id}`
    );
  }

  public showMyRequest() {
    if (window.navigator.onLine) {
      this.myRequestDialog.open(FosteringUserRequestComponent, {
        data: new UserModel(this.fosteringAnnouncementModel.id),
      });
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public get isActive(): string {
    return !this.fosteringAnnouncementModel.status
      ? $localize`:@@active: Active`
      : $localize`:@@inactive: Inactive`;
  }
}
