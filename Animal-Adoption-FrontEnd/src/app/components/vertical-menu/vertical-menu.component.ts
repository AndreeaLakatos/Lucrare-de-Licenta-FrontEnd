import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { ROUTES } from './vertical-menu-routes.config';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
})
export class VerticalMenuComponent implements OnInit {
  public menuItems: any[] = [];
  public showAccountSubmenu: boolean = false;
  constructor(
    private router: Router,
    public accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.menuItems = ROUTES;
  }

  public redirectToAdoptionAnnouncements() {
    this.router.navigateByUrl('adoption-announcements').then(() => {
      window.location.reload();
    });;
  }

  public redirectToFosteringAnnouncements() {
    this.router.navigateByUrl('fostering-announcements').then(() => {
      window.location.reload();
    });
  }

  public redirectToStatistics() {
    this.router.navigateByUrl('statistics').then(() => {
      window.location.reload();
    });
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
