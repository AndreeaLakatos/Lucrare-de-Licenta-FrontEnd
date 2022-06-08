import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { NgoDetailsModel } from '../ngo-details/models/ngo-details.model';
import { NgoDetailsComponent } from '../ngo-details/ngo-details.component';
import { UserDetailsModel } from '../user-details/models/user-details.model';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserNotificationsComponent } from '../user-notifications/user-notifications.component';
import { UserPreferencesModel } from '../user-preferences/models/user-preferences.model';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';

interface Locale {
  localeCode: string;
  label: string;
  image: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public languageImage: string = 'assets/images/flags/ro.png';
  public languageSpan: string = 'Română';
  public userPreferencesModel!: UserPreferencesModel;
  public userDetailsModel!: UserDetailsModel;
  public ngoDetailsModel!: NgoDetailsModel;
  locales: Locale[] = [
    { localeCode: 'ro', label: 'Română', image: 'assets/images/flags/ro.png' },
    {
      localeCode: 'en-US',
      label: 'English',
      image: 'assets/images/flags/gb.png',
    },
  ];
  siteLocale!: string;

  @Output() toggleSidenav = new EventEmitter();

  constructor(
    private router: Router,
    public accountService: AccountService,
    public userPreferencesDialog: MatDialog,
    public accountDetailsDialog: MatDialog,
    public ngoDetailsDialog: MatDialog,
    public notificationsDialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.isOnline = false;
  }

  public isOnline: boolean;
  ngOnInit(): void {
    this.siteLocale = window.location.pathname.split('/')[1];
    this.languageSpan = this.locales.find(
      (f) => f.localeCode === this.siteLocale
    )!.label;
    this.languageImage = this.locales.find(
      (f) => f.localeCode === this.siteLocale
    )!.image;

    this.updateOnlineStatus();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

  public onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  public editUserPreferences() {
    this.userPreferencesDialog.open(UserPreferencesComponent, {
      data: this.userPreferencesModel,
      width: '500px'
    });
  }

  public editAccountDetails() {
    this.accountDetailsDialog.open(UserDetailsComponent, {
      data: this.userDetailsModel,
    });
  }

  public editNgoDetails() {
    this.ngoDetailsDialog.open(NgoDetailsComponent, {
      data: this.ngoDetailsModel,
    });
  }

  public getUserPreferences() {
    if (window.navigator.onLine) {
      this.accountService.getUserPreferences().subscribe(
        (userPreferences) => {
          this.userPreferencesModel = userPreferences;
          this.editUserPreferences();
        },
        (err) => console.log(err)
      );
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public getAccountDetails() {
    if (window.navigator.onLine) {
      this.accountService.getUserDetails().subscribe(
        (userDetails) => {
          this.userDetailsModel = userDetails;
          this.editAccountDetails();
        },
        (err) => console.log(err)
      );
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public getNgoDetails() {
    if (window.navigator.onLine) {
      this.accountService.getNgoDetails().subscribe(
        (ngoDetails) => {
          this.ngoDetailsModel = ngoDetails;
          this.editNgoDetails();
        },
        (err) => console.log(err)
      );
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public currentUrl() {
    const url = window.location.pathname.split('/');
    let currentPath = '';
    for (let i = 2; i < url.length; i++) {
      currentPath = `${currentPath}/${url[i]}`;
    }
    return currentPath;
  }

  public openNotifications() {
    if (window.navigator.onLine) {
      this.notificationsDialog.open(UserNotificationsComponent, {
        width: '500px',
        position: {
          top: '60px',
          right: '10px',
        },
      });
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }
}
