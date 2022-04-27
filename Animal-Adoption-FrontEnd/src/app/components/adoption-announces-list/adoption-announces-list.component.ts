import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AdoptionComponent } from './adoption/adoption.component';
import { AdoptionAnnouncementModel } from './models/adoption-announcement.model';

@Component({
  selector: 'app-adoption-announces-list',
  templateUrl: './adoption-announces-list.component.html',
  styleUrls: ['./adoption-announces-list.component.scss'],
})
export class AdoptionAnnouncesListComponent implements OnInit {
  constructor(
    public accounService: AccountService,
    public ngpService: NgoService,
    public translate: TranslateService,
    public adoptionAnnouncementDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public addAnnouncement() {
    this.editAnnouncement(undefined);
  }

  public editAnnouncement(adoptionAnnouncement: AdoptionAnnouncementModel | undefined) {
    this.adoptionAnnouncementDialog.open(AdoptionComponent, {
      height: '800px',
      width: '700px',
      data: adoptionAnnouncement,
    });
  }
}
