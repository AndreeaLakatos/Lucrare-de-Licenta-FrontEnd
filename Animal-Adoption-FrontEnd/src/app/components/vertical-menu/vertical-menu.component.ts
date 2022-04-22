import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { ROUTES } from './vertical-menu-routes.config';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
})
export class VerticalMenuComponent implements OnInit {
  public menuItems: any[] = [];
  constructor(
    private router: Router,
    public accountService: AccountService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.menuItems = ROUTES;
  }
}
