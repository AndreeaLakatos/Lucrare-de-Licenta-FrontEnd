import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
}
