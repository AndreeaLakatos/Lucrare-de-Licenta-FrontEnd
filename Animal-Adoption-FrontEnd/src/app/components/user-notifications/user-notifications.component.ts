import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Notification } from './models/notification.model';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit {

  public notifications: Notification[] = [];
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.getUserNotifications();

  }

  public getUserNotifications() {
    this.accountService.getUserNotifications().subscribe((res)=> this.notifications = res);
  }

}
