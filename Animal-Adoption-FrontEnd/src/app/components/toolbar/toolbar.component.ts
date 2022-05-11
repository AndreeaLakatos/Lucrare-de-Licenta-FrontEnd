import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoDetailsModel } from '../ngo-details/models/ngo-details.model';
import { NgoDetailsComponent } from '../ngo-details/ngo-details.component';
import { UserDetailsModel } from '../user-details/models/user-details.model';
import { UserDetailsComponent } from '../user-details/user-details.component';
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
    { localeCode: 'en-US', label: 'English', image: 'assets/images/flags/gb.png' },
  ];
  siteLocale!: string;

  @Output() toggleSidenav = new EventEmitter();

  constructor(
    private router: Router,
    public accountService: AccountService,
    public userPreferencesDialog: MatDialog,
    public accountDetailsDialog: MatDialog,
    public ngoDetailsDialog: MatDialog
  ) {
  }

  ngOnInit(): void { 
    this.siteLocale = window.location.pathname.split('/')[1];
    this.languageSpan = this.locales.find(f => f.localeCode === this.siteLocale)!.label;
    this.languageImage = this.locales.find(f => f.localeCode === this.siteLocale)!.image;
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
      height: '375px',
      width: '500px',
      data: this.userPreferencesModel,
    });
  }

  public editAccountDetails() {
    this.accountDetailsDialog.open(UserDetailsComponent, {
      height: '550px',
      width: '475px',
      data: this.userDetailsModel,
    });
  }

  public editNgoDetails() {
    this.ngoDetailsDialog.open(NgoDetailsComponent, {
      height: '375px',
      width: '475px',
      data: this.ngoDetailsModel,
    });
  }

  public getUserPreferences() {
    this.accountService.getUserPreferences().subscribe(
      (userPreferences) => {
        this.userPreferencesModel = userPreferences;
        this.editUserPreferences();
      },
      (err) => console.log(err)
    );
  }

  public getAccountDetails() {
    this.accountService.getUserDetails().subscribe(
      (userDetails) => {
        this.userDetailsModel = userDetails;
        this.editAccountDetails();
      },
      (err) => console.log(err)
    );
  }

  public getNgoDetails() {
    this.accountService.getNgoDetails().subscribe(
      (ngoDetails) => {
        this.ngoDetailsModel = ngoDetails;
        this.editNgoDetails();
      },
      (err) => console.log(err)
    );
  }

  public currentUrl() {
    const url = window.location.pathname.split('/');
    let currentPath = '';
    for (let i=2; i<url.length;i++){
      currentPath =  `${currentPath}/${url[i]}`;
    }
    return currentPath;
  }
}
