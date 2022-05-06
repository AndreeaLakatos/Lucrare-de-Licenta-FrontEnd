import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { FosteringComponent } from './fostering/fostering.component';
import { FosteringAnnouncementListModel } from './models/fostering-announcement-list.model';
import { FosteringAnnouncementModel } from './models/fostering-announcement.model';

@Component({
  selector: 'app-fostering-announcements-list',
  templateUrl: './fostering-announcements-list.component.html',
  styleUrls: ['./fostering-announcements-list.component.scss']
})
export class FosteringAnnouncementsListComponent implements OnInit {

  public fosteringAnnouncements: FosteringAnnouncementListModel[] = [];
  public lat = 46.770439;
  public lng = 23.591423;
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    public translate: TranslateService,
    public fosteringAnnouncementDialog: MatDialog,
    public snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getFosteringAnnouncements();
  }

  public addAnnouncement() {
    this.editAnnouncement(undefined);
  }

  public editAnnouncement(adoptionAnnouncement: FosteringAnnouncementModel | undefined) {
    this.fosteringAnnouncementDialog.open(FosteringComponent, {
      height: '300px;',
      width: '600px',
      data: adoptionAnnouncement,
    });
  }

  public getFosteringAnnouncements() {
    this.ngoService.getFosteringAnnouncements().subscribe(
      (res) => this.fosteringAnnouncements = res
    )
  }

  public refreshPage(fosteringAnnouncementModel: FosteringAnnouncementListModel) {
    this.fosteringAnnouncements = this.fosteringAnnouncements.filter(x => x.id !== fosteringAnnouncementModel.id);
    this.snackbarService.success(this.translate.instant('deletionSucceded'))
  }

}
