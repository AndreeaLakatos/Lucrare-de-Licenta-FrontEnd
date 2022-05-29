import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { OfflineService } from 'src/app/services/offline/offline.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { PaginationMetaData } from 'src/app/models/utils/models/pagination.model';
import { FosteringComponent } from './fostering/fostering.component';
import { FilterFosteringAnnouncement, MenuItem } from './models/filter-fostering-announcements.model';
import { AnimalTranslations, FosteringAnnouncementListModel, SizeTranslations } from './models/fostering-announcement-list.model';
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

  public sizeFilters: MenuItem[] = [
    new MenuItem( $localize`:@@extraSmall: Extra small`, false, "EXTRA_SMALL"),
    new MenuItem( $localize`:@@small: Small`, false, "SMALL"),
    new MenuItem( $localize`:@@medium: Medium`, false, "MEDIUM"),
    new MenuItem( $localize`:@@large: Large`, false, "LARGE"),
    new MenuItem( $localize`:@@extraLarge: Extra large`, false, "EXTRA_LARGE"),
  ]

   public animalFilters: MenuItem[] = [
    new MenuItem( $localize`:@@cat: Cat`, false, "CAT"),
    new MenuItem( $localize`:@@dog: Dog`, false, "DOG"),
    new MenuItem( $localize`:@@rabbit: Rabbit`, false, "RABBIT")
   ]

   public othersFilters: MenuItem[] = [
    new MenuItem( $localize`:@@preferences: Preferences`, false, "preferences"),
    new MenuItem( $localize`:@@requestSent: With request sent`, false, "request"),
    new MenuItem( $localize`:@@requestNotSent: Without request sent`, false, "notRequest")
   ]

   public statusFilters: MenuItem[] = [
    new MenuItem( $localize`:@@active: Active`, false, "active"),
    new MenuItem( $localize`:@@inactive: Inactive`, false, "inactive"),
   ]

  public filters: FilterFosteringAnnouncement[] = [
    new FilterFosteringAnnouncement($localize`:@@size: Size`, this.sizeFilters, "Sizes"),
    new FilterFosteringAnnouncement($localize`:@@type: Type`, this.animalFilters,  "Types"),
    // new FilterFosteringAnnouncement($localize`:@@city: City`, []),
    new FilterFosteringAnnouncement($localize`:@@others: Others`, this.othersFilters, "Others"),
    new FilterFosteringAnnouncement($localize`:@@status: Status`, this.statusFilters, "Status")
  ];
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

  public computeFilters() {
    this.ngoService.fosteringAnnouncementsParams.sizes = this.filters[0].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.ngoService.fosteringAnnouncementsParams.types = this.filters[1].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.ngoService.fosteringAnnouncementsParams.others = this.filters[2].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.ngoService.fosteringAnnouncementsParams.status = this.filters[3].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.getFosteringAnnouncements();
  }
}
