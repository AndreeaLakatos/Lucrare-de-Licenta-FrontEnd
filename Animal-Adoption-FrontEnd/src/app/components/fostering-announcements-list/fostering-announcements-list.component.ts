import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { OfflineService } from 'src/app/services/offline/offline.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { PaginationMetaData } from 'src/app/utils/models/pagination.model';
import { FosteringComponent } from './fostering/fostering.component';
import { FosteringAnnouncementListModel } from './models/fostering-announcement-list.model';
import { FosteringAnnouncementModel } from './models/fostering-announcement.model';

@Component({
  selector: 'app-fostering-announcements-list',
  templateUrl: './fostering-announcements-list.component.html',
  styleUrls: ['./fostering-announcements-list.component.scss'],
})
export class FosteringAnnouncementsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public pagination?: PaginationMetaData;
  public fosteringAnnouncements?: FosteringAnnouncementListModel[] = [];
  public pageSizeOptions: number[] = [3];
  public currentPage = 0;
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    public fosteringAnnouncementDialog: MatDialog,
    public snackbarService: SnackbarService,
    private offlineService: OfflineService
  ) {}

  ngOnInit(): void {
    this.getFosteringAnnouncements();
  }

  public addAnnouncement() {
    this.editAnnouncement(undefined);
  }

  public editAnnouncement(
    adoptionAnnouncement: FosteringAnnouncementModel | undefined
  ) {
    const dialogRef = this.fosteringAnnouncementDialog.open(
      FosteringComponent,
      {
        width: '600px',
        data: adoptionAnnouncement,
      }
    );

    dialogRef.afterClosed().subscribe((_) => this.getFosteringAnnouncements());
  }

  public getFosteringAnnouncements() {
    if (window.navigator.onLine) {
      this.ngoService.getFosteringAnnouncements().subscribe((res) => {
        this.offlineService.updateFosteringAnnouncements(
          res.result!,
          this.fosteringAnnouncements!.map((x) => x.id)
        );
        this.fosteringAnnouncements = res.result;
        this.pagination = res.paginationMetaData;
      });
    } else {
      this.offlineService.getFosteringAnnouncementsOffline().subscribe((res) => {
        this.fosteringAnnouncements = res;
        const message = $localize`:@@offlinePaginationOff: You are offline, we will display you only last page accessed!`;
        this.snackbarService.error(message);
      })
    }
  }

  public refreshPage(
    fosteringAnnouncementModel: FosteringAnnouncementListModel
  ) {
    this.fosteringAnnouncements = this.fosteringAnnouncements?.filter(
      (x) => x.id !== fosteringAnnouncementModel.id
    );
    this.snackbarService.success(
      $localize`:@@deletionSucceded: Successfull deletion!`
    );
  }

  public onPaginateChange($event: PageEvent): void {
    this.ngoService.setFosteringAnnouncementsParams(
      $event.pageIndex + 1,
      $event.pageSize
    );
    this.getFosteringAnnouncements();
  }
}
