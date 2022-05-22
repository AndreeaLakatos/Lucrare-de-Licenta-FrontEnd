import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { OfflineService } from 'src/app/services/offline/offline.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { PaginationMetaData } from 'src/app/utils/models/pagination.model';
import { AdoptionComponent } from './adoption/adoption.component';
import { AdoptionAnnouncementListModel } from './models/adoption-announcement-list.model';
import { AdoptionAnnouncementModel } from './models/adoption-announcement.model';
import { FilterAdoptionAnnouncement, MenuItem } from './models/filter-adoption-announcements.model';

@Component({
  selector: 'app-adoption-announces-list',
  templateUrl: './adoption-announces-list.component.html',
  styleUrls: ['./adoption-announces-list.component.scss'],
})
export class AdoptionAnnouncesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public pagination?: PaginationMetaData;
  public pageSizeOptions: number[] = [3];
  public currentPage = 0;
  public adoptionAnnouncements?: AdoptionAnnouncementListModel[] = [];

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

  public filters: FilterAdoptionAnnouncement[] = [
    new FilterAdoptionAnnouncement($localize`:@@size: Size`, this.sizeFilters, "Sizes"),
    new FilterAdoptionAnnouncement($localize`:@@type: Type`, this.animalFilters,  "Types"),
    // new FilterAdoptionAnnouncement($localize`:@@city: City`, []),
    new FilterAdoptionAnnouncement($localize`:@@others: Others`, this.othersFilters, "Others"),
    new FilterAdoptionAnnouncement($localize`:@@status: Status`, this.statusFilters, "Status")
  ];

  public appliedFilters = [[], [], [], []];
  
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

  public editAnnouncement(
    adoptionAnnouncement: AdoptionAnnouncementModel | undefined
  ) {
    const dialogRef = this.adoptionAnnouncementDialog.open(AdoptionComponent, {
      width: '600px',
      data: adoptionAnnouncement,
    });
    dialogRef.afterClosed().subscribe((_) => this.getAdoptionAnnounces());
  }

  public getAdoptionAnnounces() {
    if (window.navigator.onLine) {
      this.ngoService.getAdoptionAnnouncements().subscribe(
        (res) => {
          this.offlineService.updateAdoptionAnnouncements(
            res.result!,
            this.adoptionAnnouncements!.map((x) => x.id)
          );
          this.adoptionAnnouncements = res.result;
          this.pagination = res.paginationMetaData;
        },
        (err) => console.log(err)
      );
    } else {
      this.offlineService.getAdoptionAnnouncementsOffline().subscribe((res) => {
        this.adoptionAnnouncements = res;
        this.snackbarService.error(
          $localize`:@@offlinePaginationOff: You are offline, we will display you only last page accessed!`
        );
      });
    }
  }

  public refreshPage(adoptionAnnouncement: AdoptionAnnouncementListModel) {
    this.adoptionAnnouncements = this.adoptionAnnouncements?.filter(
      (x) => x.id !== adoptionAnnouncement.id
    );
    this.snackbarService.success(
      $localize`:@@deletionSucceded: Successfull deletion!`
    );
  }

  public onPaginateChange($event: PageEvent): void {
    this.ngoService.setAdoptionAnnouncementsParams(
      $event.pageIndex + 1,
      $event.pageSize
    );
    this.getAdoptionAnnounces();
  }
  
  public computeFilters() {
    this.ngoService.adoptionAnnouncementsParams.sizes = this.filters[0].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.ngoService.adoptionAnnouncementsParams.types = this.filters[1].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.ngoService.adoptionAnnouncementsParams.others = this.filters[2].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.ngoService.adoptionAnnouncementsParams.status = this.filters[3].menuItems.filter(x => x.checked).map(x => x.value) as string[];
    this.getAdoptionAnnounces();
  }
}
