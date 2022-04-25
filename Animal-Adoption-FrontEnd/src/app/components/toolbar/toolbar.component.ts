import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoDetailsModel } from '../ngo-details/models/ngo-details.model';
import { NgoDetailsComponent } from '../ngo-details/ngo-details.component';
import { UserDetailsModel } from '../user-details/models/user-details.model';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserPreferencesModel } from '../user-preferences/models/user-preferences.model';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public languageImage: string = 'assets/images/flags/ro.png';
  public languageSpan: string = 'RO';
  public userPreferencesModel!: UserPreferencesModel;
  public userDetailsModel!: UserDetailsModel;
  public ngoDetailsModel!: NgoDetailsModel;

  @Output() toggleSidenav = new EventEmitter();

  constructor(
    private router: Router,
    public accountService: AccountService,
    public translate: TranslateService,
    public userPreferencesDialog: MatDialog,
    public accountDetailsDialog: MatDialog,
    public ngoDetailsDialog: MatDialog
  ) {
    translate.addLangs(['en-US', 'ro']);
    translate.setDefaultLang('ro');
  }

  ngOnInit(): void { }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

  public switchLang(lang: string) {
    this.translate.use(lang);
    if (lang === 'ro') {
      this.languageImage = 'assets/images/flags/ro.png';
      this.languageSpan = 'RO';
    } else {
      this.languageImage = 'assets/images/flags/gb.png';
      this.languageSpan = 'EN';
    }
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
}
