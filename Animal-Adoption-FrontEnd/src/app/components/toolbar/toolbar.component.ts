import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router:Router, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

}
