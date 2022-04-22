import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public languageImage: string = "assets/images/flags/ro.png";
  public languageSpan: string = "RO";

  @Output() toggleSidenav = new EventEmitter();

  constructor(private router:Router, public accountService: AccountService,
    public translate: TranslateService) {
      translate.addLangs(['en-US', 'ro']);
      translate.setDefaultLang('ro');
     }

  ngOnInit(): void {
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

  public switchLang(lang: string) {
    this.translate.use(lang);
    if (lang === 'ro') {
      this.languageImage = "assets/images/flags/ro.png";
      this.languageSpan = "RO";
    } else {
      this.languageImage = "assets/images/flags/gb.png";
      this.languageSpan = "EN";
    }
  }

  public onToggleSidenav() {
    this.toggleSidenav.emit();
  }

}
