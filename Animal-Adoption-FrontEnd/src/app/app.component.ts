import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AnimalAdoption';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
    public accountService: AccountService,
    private observer: BreakpointObserver
  ){
    this.matIconRegistry.addSvgIcon(
      'animal',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/animal.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
    );
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe( (res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }
}
