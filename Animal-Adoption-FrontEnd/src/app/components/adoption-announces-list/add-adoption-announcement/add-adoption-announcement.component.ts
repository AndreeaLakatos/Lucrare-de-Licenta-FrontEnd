import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';

@Component({
  selector: 'app-add-adoption-announcement',
  templateUrl: './add-adoption-announcement.component.html',
  styleUrls: ['./add-adoption-announcement.component.scss']
})
export class AddAdoptionAnnouncementComponent implements OnInit {

  constructor(public accounService: AccountService, public ngpService: NgoService, public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
