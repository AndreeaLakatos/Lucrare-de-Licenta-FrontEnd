import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
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
  constructor(
    public accounService: AccountService,
    public ngoService: NgoService,
    public translate: TranslateService,
    public fosteringAnnouncementDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFosteringAnnouncements();
  }

  public addAnnouncement() {
    this.editAnnouncement(undefined);
  }

  public editAnnouncement(adoptionAnnouncement: FosteringAnnouncementModel | undefined) {
    this.fosteringAnnouncementDialog.open(FosteringComponent, {
      height: '100%',
      width: '600px',
      data: adoptionAnnouncement,
    });
  }

  public getFosteringAnnouncements() {
    this.ngoService.getFosteringAnnouncements().subscribe(
      (res) => this.fosteringAnnouncements = res
    )
  }

}
